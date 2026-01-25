import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Types/RootState";
import routers from "../../Constants/routers";

const NonAdminRoute = () => {
  const location = useLocation();
  const user = useSelector((state: RootState) => state.authorizedUser.authorizedUser);
  const is_admin = user?.is_admin ?? false;

  const allowedForAdmin = [
    routers.personalData,
  ];

  if (is_admin && !allowedForAdmin.includes(location.pathname)) {
    return <Navigate to={routers.adminRooms} replace />;
  }

  return <Outlet />;
};

export default NonAdminRoute;

