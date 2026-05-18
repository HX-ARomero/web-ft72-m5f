import { ProductsContext } from "../contexts/ProductsContext";

interface Props {
  children: React.ReactNode;
}

export const ProductsProvider = ({ children }: Props) => {
  return (
    <ProductsContext.Provider value={{}}>{children}</ProductsContext.Provider>
  );
};
