import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts";
import { useLocation } from "react-router-dom";
export const ProtectedRoutes = () => {
  const {
    authState: { isUserLoggedIn },
  } = useAuth();

  const location = useLocation();

  return isUserLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
