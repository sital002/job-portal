import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const JobSeekerRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== "USER") {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default JobSeekerRoute;
