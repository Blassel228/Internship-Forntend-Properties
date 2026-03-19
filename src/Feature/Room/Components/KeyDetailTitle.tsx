import React from "react";

interface KeyDetailTitleProps {
  children: React.ReactNode;
}

const KeyDetailTitle: React.FC<KeyDetailTitleProps> = ({ children }) => {
  return <h3 className="lg:text-2xl sm:text-xs">{children}</h3>;
};

export default KeyDetailTitle;
