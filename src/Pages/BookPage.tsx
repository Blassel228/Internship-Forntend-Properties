// src/Pages/BookPage.tsx

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
    <div className="w-full flex justify-center">
      <FullHeader />
      <div className="flex flex-col sm:flex-col md:flex-row gap-5 justify-center mt-36 mx-4 sm:mx-4 md:mx-20">
        <BookingDetails room={room} />
        <BasicDetailsInputSection room={room} />
      </div>
    </div>
  );
};

export default BookPage;
