import React from "react";
import Navlink from "../Navlink.tsx";
import AuthButton from "./AuthButton.tsx";
import AuthButtons from "./AuthButtons.tsx";
import HeaderAvatar from "../HeaderAvatar.tsx";
import useNavigation from "../../Utils/navigate.tsx"
import routers from "../../Constants/routers.tsx";

const DesktopNav = () => {
  const { goTo } = useNavigation();

  return (
    <nav className="hidden md:flex items-center gap-3 space-x-6 font-sans">
      <ul className="flex space-x-6">
        <li>
          <Navlink to="/home">Home</Navlink>
        </li>
        <li>
          <Navlink to="/contact">Contact Us</Navlink>
        </li>
      </ul>

      <AuthButton to="/schedule-visit" variant="secondary">
        <span>Schedule a visit</span>
      </AuthButton>
      <AuthButtons />
      <HeaderAvatar className="lg" onClick={() => goTo(routers.personalData)}/>
    </nav>
  );
};

export default DesktopNav;
