import React from "react";
import { RoomOverview } from "./RoomOverview.tsx";
import KeyDetails from "./KeyDetails.tsx";

const RoomDetails: React.FC = () => {
  return (
    <>
      <div className="flex flex-row items-stretch justify-center gap-16 h-full ">
        <RoomOverview />
        <KeyDetails />
      </div>
    </>
  );
};

export default RoomDetails;
