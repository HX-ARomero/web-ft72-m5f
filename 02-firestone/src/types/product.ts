export interface Product {
  id: string;
  name: string;
  price: number;
  category: string,
  stock: number;
}

// const doc = QuerySnapshot (Estructura Compleja)
// doc.id
// doc.data() => [ {...}, {...} ]