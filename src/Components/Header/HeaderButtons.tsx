import React from "react";
import Navlink from "../Navlink.tsx";
import AuthButton from "./AuthButton.tsx";
import useAuth from "../../Hooks/useAuth.tsx";
import {getItem} from "../../Utils/localStorage.tsx";

const HeaderButtons = () => {
  const {logout} = useAuth();
  const token = getItem("token");
  return (
    <nav className="hidden md:flex items-center gap-5 space-x-6">
      <ul className="flex space-x-6">
        <li><Navlink to="/home">Home</Navlink></li>
        <li><Navlink to="/home">Rooms</Navlink></li>
        <li><Navlink to="/contact">Contact Us</Navlink></li>
      </ul>

      <AuthButton to="/schedule-visit" variant="secondary">
        <span>Schedule a visit</span>
      </AuthButton>

      {token ? (
        <div className="flex space-x-6">
          <AuthButton
            onClick={logout}
            variant="danger"
            to={"/home"}
          >
            Logout
          </AuthButton>
        </div>
        ) : (
          <>
            <Navlink
              to="/login"
            >
              Login
            </Navlink>
            <Navlink
              to="/register"
            >
              Register
            </Navlink>
          </>
        )
      }

    </nav>
  );
};

export default HeaderButtons;