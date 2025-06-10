import React from "react";
import { Room } from "../Types/types";

const PopularRoom = ({ room, text }: { room: Room; text: string }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-md">
      <img
        alt={text}
        src={`data:image/jpeg;base64,${room.image}`}
        className="w-full h-48 object-cover sm:h-64"
      />
      <div className="absolute bottom-0 left-0 w-full bg-opacity-50 p-3 sm:p-4 text-white">
        <h3 className="text-lg sm:text-xl font-bold truncate">{text}</h3>
      </div>
    </div>
  );
};

export default PopularRoom;