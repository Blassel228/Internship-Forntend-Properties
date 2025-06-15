import React from "react";

interface KeyDetailDetailsProps {
  children: React.ReactNode;
}

const KeyDetailDetails: React.FC<KeyDetailDetailsProps> = ({ children }) => {
  return (
    <p className="text-gray-600">{children}</p>
  );
};

export default KeyDetailDetails;