import React, { createContext, useContext, useMemo, useState } from "react";
import type { CartItem } from "../types/cartItem";
import type { Product } from "../types/product";

//* Type:
interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  // removeFromCart: (product: Product) => void;
  // clearCart: (product: Product) => void;
}

//* Context:
//* Context = { CartContext: {...}, AuthContext: {...}, ProductsContext: {...} }
export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

//* Provider:
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  //* 1. Estado:
  const [items, setItems] = useState<CartItem[]>([]);

  //* 2. Lógica:
  const addToCart = (product: Product) => {
    setItems((prev) => {
      //* Sumar contador del mismo producto...
      return [...prev, { product, quantity: 1 }];
    });
  };

  // removeFromCart: (product: Product) => void;
  // clearCart: (product: Product) => void;

  const value = useMemo(() => {
    return { items, addToCart };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

//* Custom Hook:
export const useCart = () => {
  //* 1 Obtener contexto:
  const context = useContext(CartContext);

  //* 2. Guard:
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }

  //* 3. Retornamos contexto:
  return context;
};

// const { items, addToCart } = useContext()
