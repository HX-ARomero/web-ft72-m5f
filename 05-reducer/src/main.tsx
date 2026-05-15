import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { CartProvider } from "./app/providers/CartProvider";
import { FavoritesProvider } from "./app/providers/FavoritesProvider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FavoritesProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FavoritesProvider>
  </StrictMode>,
);
