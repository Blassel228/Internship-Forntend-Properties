import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../Hooks/useAuth.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../Types/RootState.tsx";

const AdminRoute = () => {
  const { isAuthenticated } = useAuth();
  const { is_admin } = useSelector(
    (root: RootState) => root.authorizedUser.authorizedUser,
  ) ?? { is_admin: false };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!is_admin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
