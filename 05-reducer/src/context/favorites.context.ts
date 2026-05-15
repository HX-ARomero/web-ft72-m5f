// favorites.context.ts
import { createContext } from "react";
import type { Product } from "../types/product";
import type { FavoriteItem } from "./favorites.types";

export type FavoritesContextType = {
	items: FavoriteItem[];
	
	addFavorite: (product: Product) => void;
	
	removeFavorite: (id: number) => void;
	
	clearFavorites: () => void;
};

export const FavoritesContext =
	createContext<FavoritesContextType | null>(null);