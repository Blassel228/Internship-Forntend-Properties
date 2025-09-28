import React from "react";

const SaveButton = ({ onClick, disabled, children }) => {
  return (
    <button
      disabled={disabled}
      type="submit"
      onClick={onClick}
      className="text-sm  w-full cursor-pointer rounded-md text-white bg-blue-700 py-2 px-2 transition duration-500 font-medium hover:bg-blue-900"
    >
      {children}
    </button>
  );
};

export default SaveButton;
