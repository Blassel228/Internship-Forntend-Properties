import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import Navlink from "./Navlink";
import useAuth from "../Hooks/useAuth.tsx";
import { getItem } from "../Utils/localStorage.tsx";

const Header = ({ style }) => {
  const { logout } = useAuth();
  const token = getItem("token");

  return (
    <header
      className="bg-white shadow-md w-full px-32 transition-all duration-300 ease-in-out"
      style={style}
    >
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">VILLA</h1>
        </div>

        <div className="flex items-center space-x-6 gap-8">
          <nav className="hidden md:flex">
            <ul className="flex items-center space-x-6 gap-8">
              <li>
                <Navlink to="/home">Home</Navlink>
              </li>
              <li>
                <Navlink to="/properties">Properties</Navlink>
              </li>
              <li>
                <Navlink to="/property-details">Property Details</Navlink>
              </li>
              <li>
                <Navlink to="/contact">Contact Us</Navlink>
              </li>
            </ul>
          </nav>

          <button className="bg-orange-500 text-white px-4 py-2 rounded-full flex items-center space-x-2">
            <FaCalendarAlt className="text-lg" />
            <span>Schedule a visit</span>
          </button>

          <div className="flex items-center space-x-4">
            {token ? (
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-colors duration-200"
              >
                Logout
              </button>
            ) : (
              <>
                <Navlink
                  to="/login"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors duration-200"
                >
                  Login
                </Navlink>
                <Navlink
                  to="/register"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors duration-200"
                >
                  Register
                </Navlink>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
