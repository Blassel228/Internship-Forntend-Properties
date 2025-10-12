import Row from "../Components/Row.tsx";
import React from "react";
import {useLocation} from "react-router-dom";
import BookingDetails from "../Components/BookingDetails.tsx";
import BasicDetailsInputSection from "../Components/BasicDetailsInputSection.tsx";
import {Room} from "../Types/Room.tsx";

const Booking = () => {
  const location = useLocation();
  const room: Room = location.state?.room;
  return (
    <div className="w-full justify-center flex">
      <Row className="view gap-5 justify-center mt-36 mx-40">
        <BookingDetails room={room} />
        <BasicDetailsInputSection room={room} />
      </Row>
    </div>
  );
};

export default Booking;
