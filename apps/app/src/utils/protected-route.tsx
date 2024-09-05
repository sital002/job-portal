import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { myProfile } = useAuth();

  return !myProfile.isLoading && myProfile.isError ? (
    <Navigate to={"/login"} />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;
