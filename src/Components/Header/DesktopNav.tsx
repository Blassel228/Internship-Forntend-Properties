import React, {useState} from "react";
import Navlink from "../Navlink.tsx";
import AuthButton from "./AuthButton.tsx";
import AuthButtons from "./AuthButtons.tsx";
import HeaderAvatar from "../HeaderAvatar.tsx";
import UserDropdownMenu from "../UserDropdownMenu.tsx";

const DesktopNav = () => {
  const [open, setOpen] = useState(false);

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
      <UserDropdownMenu open={open} setOpen={setOpen}>
        <HeaderAvatar className="lg"/>
      </UserDropdownMenu>
    </nav>
  );
};

export default DesktopNav;
