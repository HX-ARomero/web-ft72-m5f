import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AdminRoute = () => {
  const { user, loading } = useAuth();

  //* 1. LOADING:
  if (loading) {
    return <p>Loading...</p>;
  }

  //* 2. USER:
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  //* 3. ADMIN:
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
