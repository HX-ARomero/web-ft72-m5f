import { Button } from "./components/Button";
import { ProductList } from "./components/ProductList";

export default function App() {
  return (
    <div>
      <h1>Reutilización de Componentes</h1>
      <hr />
      <ProductList />
      <hr />

      <Button variant="solid" onClick={() => confirm("Comprar?")}>
        Comprar
      </Button>
      <Button variant="solid" onClick={() => confirm("Logout?")}>
        Logout
      </Button>
      <Button variant="link" href="/productos">
        Ver más
      </Button>
    </div>
  );
}
