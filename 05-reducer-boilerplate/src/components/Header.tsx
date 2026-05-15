import { useCart } from "../context/useCart";

export function Header() {
  const { items } = useCart();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header
      style={{
        padding: "1rem 2rem",
        borderBottom: "1px solid #ccc",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h1>My Store</h1>

      <div>🛒 {totalItems}</div>
    </header>
  );
}
