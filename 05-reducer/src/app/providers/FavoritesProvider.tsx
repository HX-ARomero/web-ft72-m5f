import {
	useEffect,
	useReducer,
} from "react";

import { FavoritesContext } from "../../context/favorites.context";

import {
	favoritesReducer,
	initialState,
} from "../../context/favorites.reducer";

import type { Product } from "../../types/product";

//* Cargamos datos desde el LocalStorage:
function getInitialFavoritesState() {
	const storedFavorites =
		localStorage.getItem("favorites");
		
	if (!storedFavorites) {
		return initialState;
	}
	
	return JSON.parse(storedFavorites);
}

export function FavoritesProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [state, dispatch] = useReducer(
		favoritesReducer,
		initialState,
		//* Lazy initialization:
		getInitialFavoritesState,
	);
	
	//* Actualizamos LocalStorage al modificar estado:
	useEffect(() => {
		localStorage.setItem(
			"favorites",
			JSON.stringify(state),
		);
	}, [state]);
	
	function addFavorite(product: Product) {
		dispatch({
			type: "ADD_FAVORITE",
			payload: product,
		});
	}
	
	function removeFavorite(id: number) {
		dispatch({
			type: "REMOVE_FAVORITE",
			payload: id,
		});
	}
	
	function clearFavorites() {
		dispatch({
			type: "CLEAR_FAVORITES",
		});
	}
	
	return (
		<FavoritesContext.Provider
			value={{
				items: state.items,
				addFavorite,
				removeFavorite,
				clearFavorites,
			}}
		>
			{children}
		</FavoritesContext.Provider>
	);
}