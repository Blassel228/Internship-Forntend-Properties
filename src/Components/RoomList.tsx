import React from "react";
import { Room } from "../Types/types.tsx";
import RoomCard from "./RoomCard.tsx";

interface HotelRoomListProps {
  rooms: Room[] | undefined;
}

const RoomList: React.FC<HotelRoomListProps> = ({ rooms }) => {
  return rooms !== undefined ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-[10rem]">
      {rooms.map((room) => (
        <RoomCard room={room} />
      ))}
    </div>
  ) : (
    <p>There are no places left</p>
  );
};

export default RoomList;
