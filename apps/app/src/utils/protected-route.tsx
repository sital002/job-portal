import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

// Define routes that don't require authentication
const publicRoutes = ["/", "/login", "/signup", "/jobs"];

export function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  const isPublicRoute =
    publicRoutes.includes(location.pathname) ||
    publicRoutes.some((route) => location.pathname.startsWith(route + "/"));

  if (!isPublicRoute && !user) {
    // Redirect to login if authentication is required but user is not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (
    isPublicRoute &&
    user &&
    (location.pathname === "/login" || location.pathname === "/signup")
  ) {
    // Redirect to jobs page if user is already logged in and tries to access login or signup
    return <Navigate to="/jobs" replace />;
  }

  return <Outlet />;
}
