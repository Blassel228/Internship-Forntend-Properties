import React from "react";
import { FaTimes } from "react-icons/fa";
import Navlink from "../Ui/Navlink.tsx";
import routers from "../../Constants/routers.tsx";
import { useNavigate } from "react-router-dom";
import { scrollToSection } from "../../Utils/helpers.tsx";
import AuthButton from "./AuthButton.tsx";
import useAuth from "../../Hooks/useAuth.tsx";

const MobileMenu = ({ isOpen, onClose, style }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (!isOpen) return null;

  const handleScrollToContacts = () => {
    scrollToSection("contacts", "/home", navigate);
    onClose();
  };

  return (
    <div
      className="md:hidden bg-white shadow-lg absolute w-full flex flex-col items-center text-center justify-center left-0 top-full pt-4 pb-6 px-4 border-t border-gray-200 z-40"
      style={style}
    >
      <button
        className="absolute top-4 right-4 text-gray-700"
        onClick={onClose}
      >
        <FaTimes size={24} />
      </button>

      <ul className="flex flex-col space-y-4 mb-6 mt-4 w-full max-w-xs">
        <li>
          <Navlink
            to={routers.home}
            onClick={onClose}
            className="block w-full py-1"
          >
            Home
          </Navlink>
        </li>
        <li>
          <button
            onClick={handleScrollToContacts}
            className="text-black font-sans text-base font-medium hover:text-gray-900 w-full py-1"
          >
            Contact Us
          </button>
        </li>
        <li>
          <button
            onClick={handleScrollToContacts}
            className="text-black font-sans text-base font-medium hover:text-gray-900 w-full py-1"
          >
            Location
          </button>
        </li>
        {!isAuthenticated && (
          <>
            <li>
              <Navlink to={routers.login}>Login</Navlink>
            </li>
            <li>
              <Navlink to={routers.register} variant="success">
                Register
              </Navlink>
            </li>
          </>
        )}

      </ul>

      <div className="mt-4 w-full max-w-xs">
        <AuthButton
          to="/schedule-visit"
          variant="secondary"
          onClick={onClose}
          className="w-full"
        >
          Schedule a visit
        </AuthButton>
      </div>
    </div>
  );
};

export default MobileMenu;