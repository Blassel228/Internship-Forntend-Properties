import React from "react";
import { useNavigate } from "react-router-dom";
import {Room} from "../Types/types.tsx";

const RoomCard = ({ room }:{room: Room}) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/room/${room.id}`, { state: { room: room } });
  };

  return (
    <div
      key={room.id}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      onClick={handleNavigate}
    >
      <img
        src={`data:image/png;base64,${room.image}`}
        className="w-full h-48 object-cover sm:h-64"
      />

      <div className="p-3 space-y-1">
        <span className="bg-pink-200 text-pink-800 px-2 py-1 rounded-full text-xs font-medium">
          {room.type}
        </span>

        <h2 className="text-lg font-bold text-orange-600">
          ${room.price.toFixed(2)}
        </h2>

        <p className="text-base font-medium line-clamp-1">{room.area}</p>

        <div className="flex flex-wrap gap-1 text-gray-600 text-xs">
          <span>Capacity: <strong>{room.capacity}</strong></span>
          <span>Bathes: <strong>{room.bathes}</strong></span>
          <span>Area: <strong>{room.area}</strong></span>
          <span>Floor: <strong>{room.floor}</strong></span>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;