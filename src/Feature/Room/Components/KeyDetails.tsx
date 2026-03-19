import React from "react";
import Beds from "./Beds.tsx";
import Bathes from "./Bathes.tsx";
import Price from "./Price.tsx";
import TotalSpace from "./TotalSpace.tsx";
import { Room } from "../../../Types/Room.tsx";
import { useLocation } from "react-router-dom";

const KeyDetails = ({ className }) => {
  const location = useLocation();
  const room = location.state?.room as Room;
  return (
    <div className={`flex bg-gray-50 p-4 gap-6 rounded-lg shadow-none h-[6rem] flex-row lg:bg-white lg:p-4 lg:gap-6 lg:rounded-lg lg:shadow-xl lg:h-96 lg:flex-col ${className}`}>
      <TotalSpace room={room} />
      <Beds room={room} />
      <Bathes room={room} />
      <Price room={room} />
    </div>
  );
};

export default KeyDetails;