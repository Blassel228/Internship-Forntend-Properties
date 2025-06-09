import React from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import Navlink from "./Navlink";

const Subheader = ({ className, ref }) => {
  return (
    <div
      className={`bg-white py-2 w-full border-b border-gray-200 border-opacity-50 px-4 transition-all duration-300 transform ${className}`}
      ref={ref}
    >
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
        <div className="flex flex-col items-center sm:flex-row justify-center sm:justify-start sm:space-x-4 text-sm sm:text-base">
          <div className="flex items-center justify-center mb-1 sm:mb-0">
            <FaEnvelope className="text-base sm:text-lg mr-1 sm:mr-2 text-gray-500" />
            <span className="text-gray-700 text-center">info@company.com</span>
          </div>
          <div className="flex items-center justify-center mt-1 sm:mt-0">
            <FaMapMarkerAlt className="text-base sm:text-lg mr-1 sm:mr-2 text-gray-500" />
            <span className="text-gray-700 text-center">Sunny Isles Beach, FL 33160</span>
          </div>
        </div>

        <div className="flex space-x-2 sm:space-x-4 text-xl sm:text-2xl">
          <Navlink to="#"><FaFacebook className="text-base sm:text-xl" /></Navlink>
          <Navlink to="#"><FaTwitter className="text-base sm:text-xl" /></Navlink>
          <Navlink to="#"><FaLinkedin className="text-base sm:text-xl" /></Navlink>
          <Navlink to="#"><FaInstagram className="text-base sm:text-xl" /></Navlink>
        </div>
      </div>
    </div>
  );
};

export default Subheader;