import React from "react";
import Navlink from "../Ui/Navlink.tsx";
import AuthButtons from "./AuthButtons.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../Types/RootState.tsx";
import routers from "../../Constants/routers.tsx";
import { useNavigate } from "react-router-dom";
import { scrollToSection } from "../../Utils/helpers.tsx";

const DesktopNav = () => {
  const { is_admin } = useSelector(
    (root: RootState) => root.authorizedUser.authorizedUser,
  ) ?? { is_admin: false };

  const navigate = useNavigate();

  const scrollToContacts = () => {
    scrollToSection("contacts", "/home", navigate);
  };

  return (
    <nav className="hidden md:flex items-center gap-3 space-x-6 font-sans">
      <ul className="flex space-x-6 mr-16">
        <li>
          <Navlink to={is_admin ? routers.adminBookings : routers.home}>
            {is_admin ? "Bookings" : "Home"}
          </Navlink>
        </li>
        {is_admin && (
          <li>
            <Navlink to={routers.adminRooms}>Rooms</Navlink>
          </li>
        )}
         {is_admin && (
          <li>
            <Navlink to={routers.adminUsers}>Users</Navlink>
          </li>
        )}
        <li>
          <button
            onClick={scrollToContacts}
            className="text-black font-sans text-sm font-medium hover:text-gray-900 text-left cursor-pointer"
          >
            Contact us
          </button>
        </li>
        <li>
          <button
            onClick={scrollToContacts}
            className="text-black font-sans text-sm font-medium hover:text-gray-900 text-left cursor-pointer"
          >
            Location
          </button>
        </li>
      </ul>
      <AuthButtons />
    </nav>
  );
};

export default DesktopNav;