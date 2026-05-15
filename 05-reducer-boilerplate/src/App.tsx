import { CartPage } from "./components/CartPage";
import { Header } from "./components/Header";
import { ProductList } from "./components/ProductList";

function App() {
  return (
    <div>
      <Header />

      <main
        style={{
          padding: "2rem",
          display: "grid",
          gap: "2rem",
        }}
      >
        <ProductList />

        <CartPage />
      </main>
    </div>
  );
}

export default App;
