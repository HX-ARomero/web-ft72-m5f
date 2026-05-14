import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import type { Product } from "../types/Prouct";

export function ProductsPageAntes() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getDocs(collection(db, "products")).then((snap) => {
      setProducts(
        snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Product, "id">),
        })),
      );
    });
  }, []);

  return (
    <div>
      <h1>Productos ({products.length})</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} — ${p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
