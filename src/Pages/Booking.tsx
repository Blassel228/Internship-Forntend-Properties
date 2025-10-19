import Row from "../Components/Row.tsx";
import React from "react";
import { useLocation } from "react-router-dom";
import BookingDetails from "../Components/BookingDetails.tsx";
import BasicDetailsInputSection from "../Components/BasicDetailsInputSection.tsx";
import Column from "../Components/Column.tsx";

const Booking = () => {
  const location = useLocation();
  const { room, reviewCount } = location.state || {};

  if (!room) return <div>Room not found</div>;

  return (
    <div className="w-full max-w-7xl mt-36 mx-auto px-4 py-8">
      <Row className="hidden md:flex gap-6 w-full">
        <div className="w-8/12">
          <BasicDetailsInputSection room={room} />
        </div>
        <div className="w-4/12">
          <BookingDetails room={room} reviewCount={reviewCount} />
        </div>
      </Row>

      <Column className="md:hidden w-full gap-6">
        <BookingDetails room={room} reviewCount={reviewCount} />
        <BasicDetailsInputSection room={room} />
      </Column>
    </div>
  );
};

export default Booking;