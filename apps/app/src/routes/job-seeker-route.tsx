import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import ShimmerHome from "../components/shimmer";

export function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <ShimmerHome />;
  }
  if (!user) {
    // Redirect to login if no user is logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if the user's role is in the allowed roles
  if (user.role !== "USER") {
    // Redirect to unauthorized page if role is not allowed
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
