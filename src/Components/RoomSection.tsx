import React from "react";
import RoomListHeader from "./RoomListHeader.tsx";
import RoomList from "./RoomList.tsx";
import { useRoomQuery } from "../Hooks/userRoom.tsx";

const RoomSection: React.FC = () => {
  const { data: properties } = useRoomQuery();

  return (
    <>
      <RoomListHeader />
      <RoomList rooms={properties} />
    </>
  );
};

export default RoomSection;
