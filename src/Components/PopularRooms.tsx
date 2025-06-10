import React, { useEffect, useState } from 'react';
import PopularRoom from "./PopularRoom";
import { Room } from "../Types/types";
import { getRooms } from "../Api/apiRoom";
import roomNames from "../Constants/roomNames";

const PopularRooms = () => {
  const [rooms, setRooms] = useState<Room[] | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      const rooms = await getRooms(0, 3);
      const firstThree = rooms.slice(0, 3);
      setRooms(firstThree);
    };

    fetchRooms();
  }, []);

  return (
    <div className="container mx-auto py-6 px-4 sm:py-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Popular Rooms</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {rooms?.map((room, index) => (
          <PopularRoom key={room.id} room={room} text={roomNames[index]} />
        ))}
      </div>

      <button className="mt-6 w-full sm:w-auto px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300">
        SEE MORE
      </button>
    </div>
  );
};

export default PopularRooms;