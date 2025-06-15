import React from "react";

interface KeyDetailTitleProps {
  children: React.ReactNode;
}

const KeyDetailTitle: React.FC<KeyDetailTitleProps> = ({ children }) => {
  return (
    <h3 className="text-2xl">
      {children}
    </h3>
  );
};

export default KeyDetailTitle;