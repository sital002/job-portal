import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../context/useAuth";

export function RequiresAuth() {
  const { user } = useAuth();
  const location = useLocation();
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}
