import { useCart } from "../context/useCart";
import { useFavorites } from "../context/useFavorites";

export function Header() {
	const { items: cartItems } = useCart();
	
	const { items: favoriteItems } = useFavorites();
	
	const totalCartItems = cartItems.reduce(
		(acc, item) => acc + item.quantity,
		0,
	);
	
	return (
		<header
			style={{
				padding: "1rem 2rem",
				borderBottom: "1px solid #ccc",
				display: "flex",
				justifyContent: "space-between",
			}}
		>
			<h1>My Store</h1>
			
			<div
				style={{
					display: "flex",
					gap: "1rem",
				}}
			>
				<div>❤️ {favoriteItems.length}</div>
				
				<div>🛒 {totalCartItems}</div>
			</div>
		</header>
	);
}