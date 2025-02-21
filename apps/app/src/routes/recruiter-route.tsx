import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import ShimmerHome from "../components/shimmer";

const RecruiterRoute = () => {
  const { user, loading } = useAuth();
  console.log("user", user);

  if (loading) {
    return <ShimmerHome />;
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
