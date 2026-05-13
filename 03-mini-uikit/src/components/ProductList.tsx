import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { Button } from "./Button";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import { Modal } from "./Modal";

export function ProductList({ empty = true }: { empty?: boolean }) {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  //* Emulamos petición de productos a la Base de Datos:
  //* Servicio...
  function mockFetchProducts(empty: boolean): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          empty
            ? []
            : [
                { id: "1", name: "Mouse Gamer", price: 25 },
                { id: "2", name: "Teclado Mecánico", price: 60 },
                { id: "3", name: "Monitor 24 Pulgadas", price: 380 },
                { id: "4", name: "Notebook ASUS", price: 1500 },
              ],
        );
      }, 2000);
    });
  }

  useEffect(() => {
    setProducts(null);
    mockFetchProducts(empty).then(setProducts);
  }, [empty]);

  if (products === null) return <LoadingState />;
  if (products.length === 0) return <EmptyState title="No hay productos..." />;

  const handleDelete = () => {
    console.log("Elminando producto...");
    setOpen(false);
  };

  return (
    <div>
      {/* Modal ----- >>>>> */}
      <div>
        <button onClick={() => setOpen(true)}>Abrir modal</button>
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Eliminar producto"
        >
          <p>¿Seguro que querés eliminarlo?</p>
          <Button variant="solid" onClick={handleDelete}>
            Confirmar
          </Button>
        </Modal>
      </div>
      <hr />

      <h2>Lista de nuestros productos:</h2>
      <hr />
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - U$D {p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
