import React from "react";
import Navlink from "../Ui/Navlink.tsx";
import AuthButtons from "./AuthButtons.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../Types/RootState.tsx";
import routers from "../../Constants/routers.tsx";
import { useNavigate } from "react-router-dom";
import { scrollToSection } from "../../Utils/helpers.tsx";

const DesktopNav = ({ is_admin }) => {
  const navigate = useNavigate();

  const scrollToContacts = () => {
    scrollToSection("contacts", routers.home, navigate);
  };

  if (is_admin) {
    return (
      <nav className="hidden md:flex items-center gap-3 space-x-6 font-sans">
        <ul className="flex space-x-6 mr-16">
          <li>
            <Navlink to={routers.adminBookings}>
              Bookings
            </Navlink>
          </li>
          <li>
            <Navlink to={routers.adminRooms}>Rooms</Navlink>
          </li>
          <li>
            <Navlink to={routers.adminUsers}>Users</Navlink>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className="hidden md:flex items-center gap-3 space-x-6 font-sans">
      <ul className="flex space-x-6 mr-16">
        <li>
          <Navlink to={routers.home}>
            Home
          </Navlink>
        </li>
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