import React from "react";
import Beds from "./Beds.tsx";
import Bathes from "./Bathes.tsx";
import Price from "./Price.tsx";
import TotalSpace from "./TotalSpace.tsx";
import { useLocation } from "react-router-dom";

import { Room } from "../Types/Room.tsx";

const KeyDetails = () => {
  const location = useLocation();
  const room: Room = location.state?.room;
  return (
    <div className="flex bg-white p-4 gap-6 rounded-lg shadow-xl h-96 lg:flex-col lg:h- sm:flex-row">
      <TotalSpace room={room} />
      <Beds room={room} />
      <Bathes room={room} />
      <Price room={room} />
    </div>
  );
};

export default KeyDetails;
