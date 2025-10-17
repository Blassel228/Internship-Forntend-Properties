import React from "react";

const AdditionalRoomInfo = ({ children }) => {
  return (
    <span className="bg-pink-100 text-pink-800 px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap">
      {children}
    </span>
  );
};
export default AdditionalRoomInfo;
