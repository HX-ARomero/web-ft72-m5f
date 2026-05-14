import type { DocumentSnapshot } from "firebase/firestore";
import {
	createContext,
	useCallback,
	useContext,
	useState,
	type ReactNode,
} from "react";
import {
	listProducts,
	type ListProductsParams,
} from "../services/productsService";
import type { Product } from "../types/Prouct";

type ProductsState = {
	products: Product[];
	loading: boolean;
	error: string | null;
	lastDoc: DocumentSnapshot | null;
	hasMore: boolean;
	loadingMore: boolean;
};

type ProductsContextValue = ProductsState & {
	loadFirstPage: (
		params: Omit<ListProductsParams, "cursor">
	) => Promise<void>;
	loadMore: () => Promise<void>;
	reset: () => void;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

const PAGE_SIZE = 20;

export function ProductsProvider({ children }: { children: ReactNode }) {
	const [state, setState] = useState<ProductsState>({
		products: [],
		loading: false,
		error: null,
		lastDoc: null,
		hasMore: true,
		loadingMore: false,
	});
	
	const [currentParams, setCurrentParams] = useState<
		Omit<ListProductsParams, "cursor">
	>({});
	
	// 🔹 Carga inicial
	const loadFirstPage = useCallback(
		async (params: Omit<ListProductsParams, "cursor">) => {
			setCurrentParams(params);
			
			setState((s) => ({
				...s,
				loading: true,
				error: null,
				products: [],
				lastDoc: null,
				hasMore: true,
			}));
			
			try {
				const { items, lastDoc } = await listProducts({
					...params,
					pageSize: PAGE_SIZE,
				});
				
				setState((s) => ({
					...s,
					products: items,
					lastDoc,
					hasMore: items.length === PAGE_SIZE,
					loading: false,
				}));
			} catch (e) {
				const msg =
					e instanceof Error ? e.message : "Error desconocido";
					
				setState((s) => ({
					...s,
					error: msg,
					loading: false,
				}));
			}
		},
		[]
	);
	
	// 🔹 Paginación
	const loadMore = useCallback(async () => {
		setState((s) => ({ ...s, loadingMore: true }));
		
		try {
			const { items, lastDoc } = await listProducts({
				...currentParams,
				pageSize: PAGE_SIZE,
				cursor: state.lastDoc,
			});
			
			setState((s) => ({
				...s,
				products: [...s.products, ...items],
				lastDoc,
				hasMore: items.length === PAGE_SIZE,
				loadingMore: false,
			}));
		} catch (e) {
			const msg =
				e instanceof Error ? e.message : "Error desconocido";
				
			setState((s) => ({
				...s,
				error: msg,
				loadingMore: false,
			}));
		}
	}, [currentParams, state.lastDoc]);
	
	// 🔹 Reset
	const reset = useCallback(() => {
		setState({
			products: [],
			loading: false,
			error: null,
			lastDoc: null,
			hasMore: true,
			loadingMore: false,
		});
	}, []);
	
	return (
		<ProductsContext.Provider
			value={{
				...state,
				loadFirstPage,
				loadMore,
				reset,
			}}
		>
			{children}
		</ProductsContext.Provider>
	);
}

export function useProducts() {
	const ctx = useContext(ProductsContext);
	if (!ctx) {
		throw new Error(
			"useProducts debe usarse dentro de <ProductsProvider>"
		);
	}
	return ctx;
}