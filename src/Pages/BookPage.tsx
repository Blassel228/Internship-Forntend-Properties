import FullHeader from "../Components/Header/FullHeader.tsx";
import Row from "../Components/Row.tsx";
import React from "react";
import { useLocation } from "react-router-dom";
import { Room } from "../Types/types.tsx";
import BookingDetails from "../Components/BookingDetails.tsx";
import BasicDetailsInputSection from "../Components/BasicDetailsInputSection.tsx";

const BookPage = () => {
  const location = useLocation();
  const room: Room = location.state?.room;
  return (
    <div className="w-full justify-center flex">
      <FullHeader />
      <Row className="view gap-5 justify-center mt-36 mx-20">
        <BookingDetails room={room}/>
        <BasicDetailsInputSection room={room}/>
      </Row>
    </div>
  );
};

export default BookPage;