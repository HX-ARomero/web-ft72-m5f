import { useProducts } from "./contexts/ProductsContext";

const ProductList = () => {
  const { products, loading } = useProducts();

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Listado de Productos:</h1>
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
};

export default ProductList;
