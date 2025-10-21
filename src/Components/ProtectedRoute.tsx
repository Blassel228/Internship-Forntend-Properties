import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import routers from "../Constants/routers.tsx";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to={routers.login} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;