import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const AdminRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== "ADMIN") {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default AdminRoute;
