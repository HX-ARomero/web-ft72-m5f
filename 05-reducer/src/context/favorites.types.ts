// favorites.types.ts
import type { Product } from "../types/product";

export type FavoriteItem = Product;

export type FavoritesState = {
	items: FavoriteItem[];
};

export type FavoritesAction =
	| {
			type: "ADD_FAVORITE";
			payload: Product;
	  }
	| {
			type: "REMOVE_FAVORITE";
			payload: number;
	  }
	| {
			type: "CLEAR_FAVORITES";
	  };