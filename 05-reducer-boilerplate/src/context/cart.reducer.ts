import type { CartAction, CartState } from "./cart.types";

export const initialState: CartState = {
  items: [],
};

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM":
      return state;

    case "REMOVE_ITEM":
      return state;

    case "CLEAR_CART":
      return state;

    default:
      return state;
  }
}
