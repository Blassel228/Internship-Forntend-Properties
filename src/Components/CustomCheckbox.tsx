import React from "react";

const CustomCheckbox = ({ className = "", ...props }) => {
  return (
    <input
      type="checkbox"
      className={`h-6 w-6 ${className}`}
      {...props}
    />
  );
};

export default CustomCheckbox;
