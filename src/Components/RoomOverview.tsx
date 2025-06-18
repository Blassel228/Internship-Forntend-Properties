import React from "react";
import RoomDetailsContentSection from "./RoomDetailsContentSection.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {Room} from "../Types/types.tsx";
import AdditionalRoomInfo from "./AdditionalRoomInfo.tsx";
import AppButton from "./AppButton.tsx";
import routers from "../Constants/routers.tsx";
import useSearchParams from "../Hooks/useSearchParams.tsx";

export const RoomOverview = () => {
  const location = useLocation();
  const room: Room = location.state?.room;

  const navigate = useNavigate();
  const { startDate, endDate, capacity} = useSearchParams()

  const handleNavigate = () => {
    navigate(
      {
        pathname: `${routers.book}/${room.id}`,
        search: `?start_date=${startDate}&end_date=${endDate}&capacity=${capacity}`
      },
      { state: { room } }
    );
  };

  return (
    <div className="w-full md:w-1/2 flex flex-col">
      <img
        src={`data:image/png;base64,${room.image}`}
        className="w-full h-96 object-cover rounded-lg shadow-md"
        alt="Room"
      />
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-row justify-center items-center gap-2">
          <AdditionalRoomInfo>{room.type}</AdditionalRoomInfo>
          <AdditionalRoomInfo>Has {room.bedrooms} bedrooms</AdditionalRoomInfo>
          <AdditionalRoomInfo>For {room.capacity} persons</AdditionalRoomInfo>
          {room.has_jacuzzi && <AdditionalRoomInfo>Jacuzzi available</AdditionalRoomInfo>}
        </div>

        <div className="flex items-end mt-3">
          <AppButton className="py-0" onClick={handleNavigate}>Make Booking</AppButton>
        </div>
      </div>
      <RoomDetailsContentSection room={room}/>
    </div>
  );
};
