import React from "react";
import { FaTimes } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AuthButton from "./AuthButton.tsx";
import Navlink from "../Navlink.tsx";
import AuthButtons from "./AuthButtons.tsx";

const MobileMenu = ({ isOpen, onClose, style }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/home");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white shadow-lg absolute text-center w-full flex flex-col items-center justify-center left-0 top-full pt-4 pb-6 px-4 border-t border-gray-200 z-40" style={style}>
      <button
        className="absolute top-4 right-4 text-gray-700"
        onClick={onClose}
      >
        <FaTimes size={24} />
      </button>

      <ul className="flex flex-col space-y-4 mb-6 mt-4">
        <li><Navlink to="/home" onClick={onClose}>Home</Navlink></li>
        <li><Navlink to="/home" onClick={onClose}>Rooms</Navlink></li>
        <li><Navlink to="/contact" onClick={onClose}>Contact Us</Navlink></li>
      </ul>

      <AuthButton to="/schedule-visit" variant="secondary" onClick={onClose}>
        Schedule a visit
      </AuthButton>

      <ul className="flex flex-col space-y-4 mb-6 mt-4">
        <AuthButtons/>
      </ul>
    </div>
  );
};

export default MobileMenu;