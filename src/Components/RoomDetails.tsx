import React from "react";
import { useParams } from "react-router-dom";
import { UsefulLinks } from "./UsefulLinks.tsx";
import { RoomDetailsContentSection } from "./RoomDetailsContentSection.tsx";
import { Room } from "../Types/types.tsx";
import { RoomListening } from "./RoomListening.tsx";
import KeyDetails from "./KeyDetails.tsx";
import ImageWrap from "./ImageWrap.tsx";
import BookingForm from "./BookingForm.tsx";

interface RoomDetailsProps {
  room: Room;
}

const RoomDetails: React.FC<RoomDetailsProps> = ({ room }) => {
  return (
    <>
      <div className="flex flex-row items-stretch justify-center gap-16 h-full ">
        <RoomListening room={room} />
        <KeyDetails room={room} />
      </div>
    </>
  );
};

export default RoomDetails;
