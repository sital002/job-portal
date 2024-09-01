import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/authContext";
export function RequiresAuth() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}
