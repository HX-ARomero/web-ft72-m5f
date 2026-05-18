import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout";
import { AdminPage } from "../pages/AdminPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { SignupPage } from "../pages/SignupPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Públicas: */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protegidas: */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* Admin: */}
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
};
