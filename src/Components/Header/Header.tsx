import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import DesktopNav from "./DesktopNav.tsx";
import HeaderMobileMenu from "./HeaderMobileMenu.tsx";

const Header = ({ style }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md w-full px-32 transition-all duration-300 ease-in-out fixed" style={style}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 mr-5">HOTEL ROOMS</h1>
        <DesktopNav />
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <FaBars size={24} />
        </button>
      </div>

      <HeaderMobileMenu style={style} isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
};

export default Header;