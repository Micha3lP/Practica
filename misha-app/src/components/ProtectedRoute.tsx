import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authService } from "../services/authService";

// roles.ts
export const rolesRoutesMap: { [key: string]: string[] } = {
  Admin: ["/home", "/paquetes", "/admin"],
  User: ["/home"],
  Guest: ["/home"],
};

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: string; // Permitir una protección basada en rol
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const role = authService.getRole(); // Obtener el rol del usuario
  const location = useLocation(); // Obtener la ruta actual

  if (!role) {
    // Si no hay token o rol, redirigir al login
    return <Navigate to="/" />;
  }

  // Obtener las rutas permitidas para el rol actual
  const allowedRoutes = rolesRoutesMap[role];

  if (!allowedRoutes || !allowedRoutes.includes(location.pathname)) {
    // Si el rol no tiene acceso a la ruta actual, redirigir a acceso denegado
    return <Navigate to="/unauthorized" />;
  }

  // Si el usuario está autenticado y tiene acceso a la ruta, renderiza el contenido
  return children;
};

export default ProtectedRoute;
