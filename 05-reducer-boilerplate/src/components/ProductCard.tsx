import { useCart } from "../context/useCart";
import type { Product } from "../types/product";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const { addItem } = useCart();

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "8px",
      }}
    >
      <img src={product.image} alt={product.title} width={150} />

      <h3>{product.title}</h3>

      <p>${product.price}</p>

      <button onClick={() => addItem(product)}>Add to cart</button>
    </div>
  );
}
