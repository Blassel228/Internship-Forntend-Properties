import React, { useState } from "react";
import Navlink from "../Ui/Navlink.tsx";
import AuthButtons from "./AuthButtons.tsx";
import HeaderAvatar from "../Ui/HeaderAvatar.tsx";
import UserDropdownMenu from "./UserDropdownMenu.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../Types/RootState.tsx";
import routers from "../../Constants/routers.tsx";

const DesktopNav = () => {
  const [open, setOpen] = useState(false);
  const { is_admin } = useSelector(
    (root: RootState) => root.authorizedUser.authorizedUser,
  ) ?? { is_admin: false };

  return (
    <nav className="hidden md:flex items-center align-center content-center gap-3 space-x-6 font-sans">
      <ul className="flex space-x-6">
        <li>
          <Navlink to={is_admin ? routers.adminBookings : routers.home}>
            {is_admin ? "Bookings" : "Home"}
          </Navlink>
        </li>
        <li>
          <Navlink to={is_admin ? routers.adminRooms : "/contact"}>
            {is_admin ? "Rooms" : "Contact Us"}
          </Navlink>
        </li>
        <li className={`${is_admin ? "" : "hidden"}`}>
          <Navlink to={is_admin ? routers.adminUsers : "/contact"}>
            Users
          </Navlink>
        </li>
      </ul>
      <AuthButtons />
    </nav>
  );
};

export default DesktopNav;
