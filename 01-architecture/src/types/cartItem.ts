import type { Product } from "./product";

export interface CartItem {
  product: Product;
  quantity: number;
}

//* CartItem: { }
//* Carrito: { items: CartItem[] }