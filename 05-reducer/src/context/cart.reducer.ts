import type { CartAction, CartState } from "./cart.types";

export const initialState: CartState = {
  items: [], //* [ {id: Tec1, q: 3}, {id:Tec2, q}, {Tec3,q: 1} ]
  // totalItems: 0,
};

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    //* action: { type: "ADD_ITEM", payload: { id: Tec3, name, image, price } }
    case "ADD_ITEM":
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.payload,
            quantity: 1,
          },
        ],
      };

    //* action: { type: "REMOVE_ITEM", payload: id }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    //* action: { type: "CLEAR_CART" }
    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
}
