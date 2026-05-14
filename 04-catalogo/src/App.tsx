import { ProductsProvider } from "./contexts/ProductsProvider";
import { ProductsPage } from "./pages/ProductsPage";

export default function App() {
	return (
		<ProductsProvider>
			<ProductsPage />
		</ProductsProvider>
	);
}