import React from "react";
import RoomListHeader from "./RoomListHeader.tsx";
import RoomList from "./RoomList.tsx";

const RoomSection: React.FC = () => {
  return (
    <>
      <RoomListHeader />
      <RoomList />
    </>
  );
};



export default RoomSection;
