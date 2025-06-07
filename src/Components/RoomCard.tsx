import React from "react";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {
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
        alt={room.address}
        className="w-full h-64 object-cover"
      />

      <div className="p-4">
        <span className="bg-pink-200 text-pink-800 px-2 py-1 rounded-full text-sm font-medium mb-2">
          {room.type}
        </span>

        <h2 className="text-xl font-bold mb-2 text-orange-600">
          ${room.price.toFixed(2)}
        </h2>

        <p className="text-lg font-medium mb-2">{room.address}</p>

        <div className="flex flex-wrap gap-2 text-gray-600 text-sm">
          <span>
            Bedrooms: <strong>{room.bedrooms}</strong>
          </span>
          <span>
            Bathrooms: <strong>{room.bathrooms}</strong>
          </span>
          <span>
            Area: <strong>{room.area}</strong>
          </span>
          <span>
            Floor: <strong>{room.floor}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
