import React from "react";

const AppButton: React.FC= ({
  className = "",
  children,
  onClick,
}) => {
  return (
    <button
      className={`px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md duration-200 w-full md:w-auto cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default AppButton;