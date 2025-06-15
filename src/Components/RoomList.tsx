import React from "react";
import RoomCard from "./RoomCard";
import useSearchRoomsQuery from "../Hooks/useSearchRooms.tsx";
import { useLocation } from "react-router-dom";
import Spinner from "./Spinner.tsx";

const RoomList = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const urlStartDate = params.get("start_date") || "";
  const urlEndDate = params.get("end_date") || "";
  const urlCapacity = parseInt(params.get("capacity") || "1", 10);

  const isFormEmpty = !urlStartDate || !urlEndDate || urlCapacity < 1;

  const { data: rooms = [], isLoading, isError } = useSearchRoomsQuery(
    urlStartDate,
    urlEndDate,
    urlCapacity
  );

  if(isFormEmpty){
    return (
      <p className="text-center text-gray-500 text-lg mt-8">No rooms found</p>
    )
  }

  if (isLoading) {
    return <Spinner/>
  }

  if (isError) {
    return <p className="text-center text-red-500 text-lg mt-8">Failed to load rooms</p>;
  }

  return (
    <div className="px-4 md:px-20 lg:px-[10rem] pb-10">
      {rooms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-8">No rooms found</p>
      )}
    </div>
  );
};

export default RoomList;