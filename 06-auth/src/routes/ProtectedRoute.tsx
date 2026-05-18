import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  //* 1. LOADING:
  if (loading) {
    return <p>Loading...</p>;
  }

  //* 2. USER:
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
