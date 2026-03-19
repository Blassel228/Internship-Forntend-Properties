import React from "react";

const AppButton: React.FC = ({ className = "", children, onClick, ...props }) => {
  return (
    <button
      className={`px-8 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md duration-200 md:w-auto cursor-pointer ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default AppButton;
