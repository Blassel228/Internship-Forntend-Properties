import RoomDetails from "../Components/RoomDetails.tsx";
import FullHeader from "../Components/FullHeader.tsx";
import { useLocation } from "react-router-dom";
import { Room } from "../Types/types.tsx";
import BookingForm from "../Components/BookingForm.tsx";
import React from "react";
import ImageWrap from "../Components/ImageWrap.tsx";

const RoomPage = () => {
  const location = useLocation();
  const room: Room = location.state?.room;

  if (!room) {
    return <div>Property not found</div>;
  }

  return (
    <>
      <FullHeader />
      <div className="pt-40 h-[35rem]">
        <ImageWrap />
      </div>
      <BookingForm room={room} />
      <div className="min-h-screen flex justify-center flex-col px-[10rem] pb-10">
        <RoomDetails room={room} />
      </div>
    </>
  );
};

export default RoomPage;
