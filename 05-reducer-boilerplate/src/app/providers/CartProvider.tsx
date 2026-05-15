import { useReducer } from "react";
import { CartContext } from "../../context/cart.context";
import { cartReducer, initialState } from "../../context/cart.reducer";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  function addItem() {}

  function removeItem() {}

  function clearCart() {}

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
