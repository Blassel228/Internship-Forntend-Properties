import React from "react";
import RoomDescription from "./RoomDetailsContentSection.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import AdditionalRoomInfo from "./AdditionalRoomInfo.tsx";
import AppButton from "./AppButton.tsx";
import routers from "../Constants/routers.tsx";
import useSearchParams from "../Hooks/useSearchParams.tsx";
import { Room } from "../Types/Room.tsx";
import KeyDetails from "./KeyDetails.tsx";
import Column from "./Column.tsx";
import Row from "./Row.tsx";

export const RoomOverview = () => {
  const location = useLocation();
  const room: Room = location.state?.room;

  const navigate = useNavigate();
  const { startDate, endDate, capacity } = useSearchParams();

  const handleNavigate = () => {
    navigate(
      {
        pathname: `${routers.book}/${room.id}`,
        search: `?start_date=${startDate}&end_date=${endDate}&capacity=${capacity}`,
      },
      { state: { room } },
    );
  };

  return (
    <Row className="gap-16 px-56 pb-10">
      <Column>
        <img
          src={`data:image/png;base64,${room.image}`}
          className="w-full h-96 object-cover rounded-lg shadow-md"
          alt="Room"
        />
        <Row className="mt-3 justify-between">
          <Row className="gap-3 ">
            <AdditionalRoomInfo>{room.type}</AdditionalRoomInfo>
            <AdditionalRoomInfo>
              Has {room.bedrooms} bedrooms
            </AdditionalRoomInfo>
            <AdditionalRoomInfo>For {room.capacity} persons</AdditionalRoomInfo>
            {room.has_jacuzzi && (
              <AdditionalRoomInfo>Jacuzzi available</AdditionalRoomInfo>
            )}
          </Row>
          <AppButton className="py-0 ml-10" onClick={handleNavigate}>
            Make Booking
          </AppButton>
        </Row>
        <RoomDescription room={room} />
      </Column>
      <KeyDetails />
    </Row>
  );
};
