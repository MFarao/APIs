import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Si no hay token → no está logueado
  if (!token) return <Navigate to="/inicio" replace />;

  // Si se requiere rol específico y no lo cumple
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/acceso-denegado" replace />;
  }

  return children;
};

export default ProtectedRoute;