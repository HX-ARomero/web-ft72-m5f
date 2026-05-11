import type { ReactNode } from "react";
import { CartProvider } from "./cart.context";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    //* Otros Providers: , ProductsProvider, etc

    //* AuthProvider
      //* ProductsProvider
        <CartProvider>{children}</CartProvider>
      //* ProductsProvider
    //* AuthProvider
  );
};

//* { num: 3 }
