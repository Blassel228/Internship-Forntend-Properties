import React from "react";
import Navlink from "../Navlink.tsx";
import AuthButton from "./AuthButton.tsx";
import AuthButtons from "./AuthButtons.tsx";

const DesktopNav = () => {
  return (
    <nav className="hidden md:flex items-center gap-5 space-x-6">
      <ul className="flex space-x-6">
        <li><Navlink to="/home">Home</Navlink></li>
        <li><Navlink to="/contact">Contact Us</Navlink></li>
      </ul>

      <AuthButton to="/schedule-visit" variant="secondary">
        <span>Schedule a visit</span>
      </AuthButton>
      <AuthButtons/>
    </nav>
  );
};

export default DesktopNav;