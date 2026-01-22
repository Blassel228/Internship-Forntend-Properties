import React from "react";
import Navlink from "../Ui/Navlink.tsx";
import AuthButton from "./AuthButton.tsx";
import useAuth from "../../Hooks/useAuth.tsx";
import { getItem } from "../../Utils/localStorage.tsx";
import Column from "../Ui/Column.tsx";
import {router} from "next/client";
import routers from "../../Constants/routers.tsx";

const HeaderButtons = () => {
  const { logout } = useAuth();
  const token = getItem("token");
  return (
    <nav className="hidden md:flex items-center gap-5 space-x-6">
      <ul className="flex space-x-6">
        <li>
          <Navlink to="/home">Home</Navlink>
        </li>
        <li>
          <Navlink to="/home">Rooms</Navlink>
        </li>
        <li>
          <Navlink to="/contact">Contact Us</Navlink>
        </li>
      </ul>

      <AuthButton
        to="/schedule-visit"
        variant="secondary"
        className="font-medium"
      >
        <span>Schedule a visit</span>
      </AuthButton>

      {token ? (
        <div className="flex space-x-6">
          <AuthButton onClick={logout} variant="danger" to={routers.home}>
            Logout
          </AuthButton>
        </div>
      ) : (
        <>
          <Navlink to="/login">Login</Navlink>
          <Navlink to="/register">Register</Navlink>
        </>
      )}
    </nav>
  );
};

export default HeaderButtons;
