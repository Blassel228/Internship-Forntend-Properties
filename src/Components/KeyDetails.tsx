import React from "react";
import Beds from "./Beds.tsx";
import Bathes from "./Bathes.tsx";
import Price from "./Price.tsx";
import TotalSpace from "./TotalSpace.tsx";
import { Room } from "../Types/Room.tsx";
import {useLocation} from "react-router-dom";

const KeyDetails = () => {
  const location = useLocation();
  const room = location.state?.room as Room;
  return (
    <div className="flex bg-white p-4 gap-6 rounded-lg shadow-xl lg:h-96 lg:flex-col sm:flex-row sm:h-[10rem]">
      <TotalSpace room={room} />
      <Beds room={room} />
      <Bathes room={room} />
      <Price room={room} />
    </div>
  );
};

export default KeyDetails;