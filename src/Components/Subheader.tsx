import React from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import Navlink from "./Navlink.tsx";

const Subheader = ({ className, ref }) => {
  return (
    <div
      className={`bg-white py-2 w-full border-b border-gray-200 border-opacity-50 px-32 transition-all duration-300 ease-in-out transform ${className}`}
      ref={ref}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <div className="flex items-center">
            <FaEnvelope className="text-lg mr-2 text-gray-500" />
            <span className="text-gray-700">info@company.com</span>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-lg mr-2 text-gray-500" />
            <span className="text-gray-700">Sunny Isles Beach, FL 33160</span>
          </div>
        </div>

        <div className="flex space-x-4">
          <Navlink to="#">
            <FaFacebook className="text-xl" />
          </Navlink>
          <Navlink to="#">
            <FaTwitter className="text-xl" />
          </Navlink>
          <Navlink to="#">
            <FaLinkedin className="text-xl" />
          </Navlink>
          <Navlink to="#">
            <FaInstagram className="text-xl" />
          </Navlink>
        </div>
      </div>
    </div>
  );
};

export default Subheader;
