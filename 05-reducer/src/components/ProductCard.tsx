import { useCart } from "../context/useCart";
import { useFavorites } from "../context/useFavorites";
import type { Product } from "../types/product";

type Props = {
	product: Product;
};

export function ProductCard({ product }: Props) {
	const { addItem } = useCart();
	
	const {
		items,
		addFavorite,
		removeFavorite,
	} = useFavorites();
	
	const isFavorite = items.some(
		(item) => item.id === product.id,
	);
	
	function toggleFavorite() {
		if (isFavorite) {
			removeFavorite(product.id);
			return;
		}
		
		addFavorite(product);
	}
	
	return (
		<div
			style={{
				border: "1px solid #ccc",
				padding: "1rem",
				borderRadius: "8px",
			}}
		>
			<img
				src={product.image}
				alt={product.title}
				width={150}
			/>
			
			<h3>{product.title}</h3>
			
			<p>${product.price}</p>
			
			<div
				style={{
					display: "flex",
					gap: "0.5rem",
				}}
			>
				<button onClick={() => addItem(product)}>
					Add to cart
				</button>
				
				<button onClick={toggleFavorite}>
					{isFavorite
						? "❤️"
						: "🩶"}
				</button>
			</div>
		</div>
	);
}