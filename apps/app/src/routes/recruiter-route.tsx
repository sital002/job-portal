import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const RecruiterRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== "RECRUITER") {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default RecruiterRoute;
