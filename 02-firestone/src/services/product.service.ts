import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  where,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../config/firebase";
import type { Product } from "../types/product";

//* Obtener todos los productos:
export const getProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(collection(db, "products"));
  // console.log(snapshot);
  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Product,
  );
};

//* Obtener un producto por ID:
export const getProductById = async (id: string): Promise<Product | null> => {
  const ref = doc(db, "products", id);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Product;
};

//* Obtener productos por categoría ordenados por precio:
//* Mapper reutilizable
const mapProduct = (doc: QueryDocumentSnapshot<DocumentData>): Product => {
  const data = doc.data();

  return {
    id: doc.id,
    ...data,
  } as Product;
};

//* Obtener productos por categoría ordenados por precio
export const getProductsByCategory = async (
  category: string,
): Promise<Product[]> => {
  try {
    // Validación básica
    if (!category.trim()) {
      return [];
    }

    const productsRef = collection(db, "products");

    const productsQuery = query(
      productsRef,
      where("category", "==", category),
      orderBy("price", "asc"),
    );

    const snapshot = await getDocs(productsQuery);

    return snapshot.docs.map(mapProduct);
  } catch (error) {
    console.error("[getProductsByCategory] Error fetching products:", error);

    throw new Error("Failed to fetch products by category");
  }
};

// export const getProductsByCategory = async (
//   category: string,
// ): Promise<Product[]> => {
//   const q = query(
//     collection(db, "products"),
//     where("category", "==", category),
//     orderBy("price", "asc"),
//   );

//   const snapshot = await getDocs(q);

//   return snapshot.docs.map(
//     (doc) =>
//       ({
//         id: doc.id,
//         ...doc.data(),
//       }) as Product,
//   );
// };
