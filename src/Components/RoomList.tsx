import React from "react";
import RoomCard from "./RoomCard.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {Room} from "../Types/types.tsx";
import useSearchRoomsQuery from "../Hooks/useSearchRooms.tsx";


const RoomList = () => {
  const queryClient = useQueryClient();
   const { data: rooms, isLoading, isError } = useSearchRoomsQuery();

  return (
    <div className="px-4 md:px-20 lg:px-[10rem] pb-10">
      {rooms !== null && rooms !== undefined ? (
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