import BookingDetailTitle from "./BookingDetailTitle.tsx";
import BookingDetail from "./BookingDetail.tsx";
import Column from "./Column.tsx";
import { toWords  } from 'number-to-words';
import React from "react";
import capitalize from "../Utils/capitalize.tsx";
import calculaterNights from "../Utils/calculateNights.tsx";
import useBookingParams from "../Hooks/useSearchParams.tsx";

const BookingDetails = () => {
  const { startDate, endDate, capacity } = useBookingParams();
  let nights = calculaterNights(startDate, endDate);

  return(
    <Column className="bg-white border-gray-300 border w-full px-5 py-3 gap-3 rounded-b-md">
      <h2 className="text-xl font-bold">Your booking info</h2>

      <div className="flex justify-between items-center py-3 border-b border-gray-200">
        <div>
          <BookingDetailTitle>Check in date</BookingDetailTitle>
          <BookingDetail>{startDate}</BookingDetail>
        </div>

        <div>
          <BookingDetailTitle>Check out date</BookingDetailTitle>
          <BookingDetail>{endDate}</BookingDetail>
        </div>
      </div>

      <div className="py-3 border-b border-gray-200">
        <BookingDetailTitle>Stay duration:</BookingDetailTitle>
        <BookingDetail>{capitalize(toWords(nights))} {nights > 1 ? "nights" : "night"}</BookingDetail>
      </div>

      <div className="py-3">
        <BookingDetailTitle>You have chosen:</BookingDetailTitle>
        <BookingDetail>Room for {toWords(capacity)} {capacity > 1 ? "people" : "person"}</BookingDetail>
      </div>
    </Column>
  )
}

export default BookingDetails;