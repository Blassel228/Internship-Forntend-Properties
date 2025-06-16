import React from "react";

interface Props {
  children: React.ReactNode;
}

const AdditionalRoomInfo: React.FC<Props> = ({ children }) => {
  return (
    <span className="bg-pink-200 w-fit text-pink-800 px-2 py-1 text-sm font-medium mt-4 flex justify-center items-center rounded-b-md">
      {children}
    </span>
  );
};

export default AdditionalRoomInfo;