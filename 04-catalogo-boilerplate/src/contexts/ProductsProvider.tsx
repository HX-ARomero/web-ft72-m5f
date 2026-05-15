import { createContext, useContext } from "react";

type ProductsContextValue = Record<string, unknown> | null;
const ProductsContext = createContext<ProductsContextValue>(null);

export function ProductsProvider(
	{ children }: { children: React.ReactNode }
) {
	return (
		<ProductsContext.Provider value={{}}>
			{children}
		</ProductsContext.Provider>
	);
}

export function useProducts() {
	const context = useContext(ProductsContext);
	if (!context) throw new Error("useProducts debe usarse dentro de ProductsProvider");
	return context;
}