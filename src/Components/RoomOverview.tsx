import React from "react";
import { RoomDetailsContentSection } from "./RoomDetailsContentSection.tsx";
import { UsefulLinks } from "./UsefulLinks.tsx";
import {useLocation} from "react-router-dom";
import {Room} from "../Types/types.tsx";

export const RoomOverview = () => {
  const location = useLocation();
  const room: Room = location.state?.room;

  return (
    <div className="w-full md:w-1/2 flex flex-col">
      <img
        src={`data:image/png;base64,${room.image}`}
        className="w-full h-96 object-cover rounded-lg shadow-md"
        alt="Room"
      />
      <div className="flex flex-row gap-2">
         <span className="bg-pink-200 w-fit text-pink-800 px-2 py-1 text-sm font-medium mt-4 flex justify-center items-center rounded-b-md">
          {room.type}
        </span>
        <span className="bg-pink-200 w-fit text-pink-800 px-2 py-1 text-sm font-medium mt-4 flex justify-center items-center rounded-b-md">
          Has {room.bedrooms} bedrooms
        </span>
        <span className="bg-pink-200 w-fit text-pink-800 px-2 py-1 text-sm font-medium mt-4 flex justify-center items-center rounded-b-md">
          For {room.capacity} persons
        </span>
        {room.has_jacuzzi ? (
          <span className="bg-pink-200 w-fit text-pink-800 px-2 py-1 text-sm font-medium mt-4 flex justify-center items-center rounded-b-md">
            Jacuzzi available
          </span>
          ) :
          ""
        }
      </div>
      <RoomDetailsContentSection room={room}/>
      <UsefulLinks />
    </div>
  );
};
