import React from "react";

const Contract = () => {
  return (
    <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
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
          <polyline points="17 11 12 16 7 11"></polyline>
          <line x1="12" y1="4" x2="12" y2="20"></line>
        </svg>
      </span>
      <div>
        <h3 className="text-2xl">Contract</h3>
        <p className="text-gray-600">Contract Ready</p>
      </div>
    </div>
  );
};

export default Contract;
