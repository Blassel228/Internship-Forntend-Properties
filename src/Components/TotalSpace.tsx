import React from "react";

const TotalSpace = ({ property }) => {
  return (
    <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
      <span className="text-orange-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8"
        >
          <path d="M18 21H6a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2z"></path>
          <rect x="7" y="3" width="10" height="18" rx="2" ry="2"></rect>
        </svg>
      </span>
      <div>
        <h3 className="text-2xl">{property.totalSpace}</h3>
        <p className="text-lg text-gray-600">Total Flat Space</p>
      </div>
    </div>
  );
};

export default TotalSpace;
