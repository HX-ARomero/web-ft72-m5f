// ProductsContext.tsx
import {
  createContext, useContext, useEffect, useMemo, useState
} from "react";
import { getProducts } from "../services/product.service";
import type { Product } from "../types/product";

interface ProductsContextType {
	products: Product[];
	loading: boolean;
}

// Contexto:
const ProductsContext = createContext<ProductsContextType>({
	products: [],
	loading: true,
});

// Provider:
export const ProductsProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		getProducts()
			.then(setProducts)
			.finally(() => setLoading(false));
		}, []);
		
	const value = useMemo(() => (
		{ products, loading }), [products, loading]
	);
	
	return (
		<ProductsContext.Provider value={value}>
			{children}
		</ProductsContext.Provider>
	);
};

// Custom Hook:
export const useProducts = () => useContext(ProductsContext);