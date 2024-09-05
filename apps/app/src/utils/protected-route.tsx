import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { myProfile } = useAuth();
  if (myProfile.isLoading) {
    return <div>Loading...</div>;
  }
  if (!myProfile.isLoading && myProfile.isError) {
    return <Navigate to={"/signin"} />;
  }
  return children;
};

export default ProtectedRoute;
