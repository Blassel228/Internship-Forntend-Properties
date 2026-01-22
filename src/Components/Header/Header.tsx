import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import DesktopNav from "./DesktopNav.tsx";
import HeaderMobileMenu from "./HeaderMobileMenu.tsx";
import { useNavigate } from "react-router-dom";
import routers from "../../Constants/routers.tsx";
import Row from "../Ui/Row.tsx";
import UserDropdownMenu from "./UserDropdownMenu.tsx";
import HeaderAvatar from "../Ui/HeaderAvatar.tsx";
import useAuth from "../../Hooks/useAuth.tsx";

const Header = ({ style }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const {isAuthenticated} = useAuth();

  const toHome = () => {
    navigate(routers.home);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full px-16  py-4 fixed top-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent shadow-none"
      }`}
      style={style}
    >
      <div className="w-full flex justify-between">
        <div className="text-center content-center">
          <h1
            className="text-black font-bold mr-5 font-sans cursor-pointer lg:text-2xl md:text-sm sm:text-xl"
            onClick={toHome}
          >
            HOTEL ROOMS
          </h1>
        </div>
        <Row className="text-center gap-4 content-center">
            <DesktopNav />
            {
              isAuthenticated ?
                <UserDropdownMenu open={open} setOpen={setOpen}>
                  <HeaderAvatar className="lg" />
                </UserDropdownMenu> : null
            }

          <button
            className="md:hidden text-gray-700 text-center"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <FaBars size={24} />
          </button>
        </Row>
      </div>
      <HeaderMobileMenu
        style={style}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Header;
