import React from "react";

const Safety = () => {
  return (
    <div className="flex items-center gap-2">
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
          <path d="M12 22s8 0 8-4-8-4-8 4z"></path>
          <path d="M5.45 5.11C7.7 4.1 9 5 9 8c0 7-6 11-6 11s-6-4-8-11.89"></path>
        </svg>
      </span>
      <div>
        <h3 className="text-2xl">Safety</h3>
        <p className="text-gray-600">24/7 Under Control</p>
      </div>
    </div>
  );
};

export default Safety;
