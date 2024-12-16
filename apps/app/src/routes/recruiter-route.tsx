import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const RecruiterRoute = () => {
  const { user, loading } = useAuth();
  console.log("user", user);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }

  return user?.role !== "RECRUITER" ? (
    <Navigate to="/unauthorized" />
  ) : (
    <Outlet />
  );
};

export default RecruiterRoute;
