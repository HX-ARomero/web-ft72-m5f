// CartProvider.tsx
import {
  useEffect,
  useReducer,
} from "react";

import { CartContext } from "../../context/cart.context";

import {
  cartReducer,
  initialState,
} from "../../context/cart.reducer";

import type { Product } from "../../types/product";

//* Cargamos datos desde el LocalStorage:
function getInitialCartState() {
	const storedCart = localStorage.getItem("cart");
	
	if (!storedCart) {
		return initialState;
	}
	
	return JSON.parse(storedCart);
}

export function CartProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	//* Lazy initialization:
	const [state, dispatch] = useReducer(
		cartReducer,
		initialState,
		getInitialCartState,
	);
	
	//* Actualizamos LocalStorage al modificar estado:
	useEffect(() => {
		localStorage.setItem(
			"cart",
			JSON.stringify(state),
		);
	}, [state]);
	
	function addItem(product: Product) {
		dispatch({
			type: "ADD_ITEM",
			payload: product,
		});
	}
	
	function removeItem(id: number) {
		dispatch({
			type: "REMOVE_ITEM",
			payload: id,
		});
	}
	
	function clearCart() {
		dispatch({
			type: "CLEAR_CART",
		});
	}
	
	return (
		<CartContext.Provider
			value={{
				items: state.items,
				addItem,
				removeItem,
				clearCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}