import React from "react";
import { Room } from "../Types/types.tsx";
import RoomCard from "./RoomCard.tsx";

interface HotelRoomListProps {
  rooms: Room[] | undefined;
}

const RoomList: React.FC<HotelRoomListProps> = ({ rooms }) => {
  return (
    <div className="px-4 md:px-20 lg:px-[10rem]">
      {rooms !== undefined ? (
        rooms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-8">No rooms found</p>
        )
      ) : (
        <p className="text-center text-gray-500 text-lg mt-8">Loading...</p>
      )}
    </div>
  );
};

export default RoomList;