import React from "react";

interface Props {
  children: React.ReactNode;
}

const AdditionalRoomInfo: React.FC<Props> = ({ children }) => {
  return (
    <span className="bg-pink-200 w-fit h-[32px] text-pink-800 px-2 text-xs font-medium flex justify-center items-center rounded-md">
      {children}
    </span>
  );
};

export default AdditionalRoomInfo;
