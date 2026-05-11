//App.tsx
import type { JSX } from "react";
import { useCart } from "./contexts/cart.context";
import type { Product } from "./types/product";

function App(): JSX.Element {
  const { items, addToCart } = useCart();

  // Productos de prueba:
  const products: Product[] = [
    {
      id: 2,
      title: "Laptop",
      price: 1200,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Teclado",
      price: 100,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Mouse",
      price: 50,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      title: "Monitor",
      price: 300,
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Carrito de Compras</h1>
      <hr style={{ margin: "1rem 0" }} />

      {/* Botones para agregar productos: */}
      <h2>Productos</h2>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {products.map((product) => (
          <button key={product.id} onClick={() => addToCart(product)}>
            Agregar {product.title}
          </button>
        ))}
      </div>
      <hr style={{ margin: "1rem 0" }} />

      {/* Lista de items: */}
      <h2>Items en el carrito</h2>
      {items.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.product.id}>
              <strong>{item.product.title}</strong> - ${item.product.price} |
              Cantidad: {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
