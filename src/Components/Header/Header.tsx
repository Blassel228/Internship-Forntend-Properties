import React, {useEffect, useState} from "react";
import {FaBars} from "react-icons/fa";
import DesktopNav from "./DesktopNav.tsx";
import HeaderMobileMenu from "./HeaderMobileMenu.tsx";
import {useNavigate} from "react-router-dom";
import routers from "../../Constants/routers.tsx";

const Header = ({ style }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

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
      className={`w-full px-32 fixed top-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-white shadow-md" 
          : "bg-transparent shadow-none" 
      }`}
      style={style}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1
          className="text-2xl text-black font-bold mr-5 font-sans cursor-pointer"
          onClick={toHome}
        >
          HOTEL ROOMS
        </h1>
        <DesktopNav />
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <FaBars size={24} />
        </button>
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
