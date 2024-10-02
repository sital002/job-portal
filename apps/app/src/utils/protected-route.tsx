import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { myProfile } = useAuth();
  const { isLoading, isError } = myProfile;

  return !isLoading && isError ? <Navigate to={"/login"} /> : <Outlet />;
};

export default ProtectedRoute;
