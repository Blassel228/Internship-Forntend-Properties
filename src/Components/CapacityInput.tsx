import React from "react";
import { CiUser } from "react-icons/ci";

const CapacityInput = ({ label, value, onChange, placeholder }) => {
  return (
    <div className="flex flex-col w-full md:w-1/3">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>

      <div className="relative w-full">
        <CiUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black text-xl" />
        <input
          type="number"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min="1"
          className="px-4 py-2 rounded-md bg-white text-gray-900 border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 w-full"
        />
      </div>
    </div>
  );
};

export default CapacityInput;
