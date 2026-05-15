import { useCart } from "../context/useCart";

export function CartPage() {
  const { items, removeItem, clearCart } = useCart();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <section>
      <h2>Cart</h2>

      {items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.title} x {item.quantity}
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>

          <h3>Total: ${total}</h3>

          <button onClick={clearCart}>Clear cart</button>
        </>
      )}
    </section>
  );
}
