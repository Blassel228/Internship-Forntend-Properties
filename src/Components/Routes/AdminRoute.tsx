import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../Types/RootState.tsx";
import  adminRouters  from "../../Constants/adminRouters.tsx";
import routers from "../../Constants/routers.tsx";

const AdminRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const user = useSelector((root: RootState) => root.authorizedUser.authorizedUser);
  
  const is_admin = user?.is_admin ?? false;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!is_admin) {
    return <Navigate to="/" replace />;
  }

  if (!adminRouters.includes(location.pathname)) {
    return <Navigate to={routers.adminRooms} replace />;
  }

  return <Outlet />;
};

export default AdminRoute;