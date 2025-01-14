import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  // If user is logged in, redirect to dashboard or the page they came from
  return user ? (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
