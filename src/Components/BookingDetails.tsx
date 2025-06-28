// src/Components/BookingDetails.tsx

import BookingDetailTitle from "./BookingDetailTitle.tsx";
import BookingDetail from "./BookingDetail.tsx";
import { toWords, toWordsOrdinal } from "number-to-words";
import React from "react";
import capitalize from "../Utils/capitalize.tsx";
import calculaterNights from "../Utils/calculateNights.tsx";
import useBookingParams from "../Hooks/useSearchParams.tsx";
import ContainerWithBorders from "./ContainerWithBorders.tsx";
import Column from "./Column.tsx";
import AdditionalRoomInfo from "./AdditionalRoomInfo.tsx";
import substituteDaysAndFormatDate from "../Utils/substituteDaysAndFormatDate.tsx";

const BookingDetails = ({ room }) => {
  const { startDate, endDate, capacity } = useBookingParams();
  const nights = calculaterNights(startDate, endDate);

  return (
    <Column className="bookingDetails gap-5 sm:w-full">
      <Column className="roomInfo">
        <img
          src={`data:image/png;base64,${room.image}`}
          className="roomPhoto h-full object-cover rounded-t-md"
          alt="Room"
        />
        <ContainerWithBorders>
          <AdditionalRoomInfo>{room.type}</AdditionalRoomInfo>
          <div className="flex items-center">
            <p className="bg-orange-500 text-white px-2 py-0.5 text-center rounded mr-1.5">
              7.7
            </p>
            <span> · Good 28 reviews </span>
          </div>
          <p>
            {room.area} Area, {capitalize(toWordsOrdinal(room.floor))} floor
          </p>
        </ContainerWithBorders>
      </Column>

      <ContainerWithBorders>
        <h2 className="text-xl font-bold mb-2">Price Details</h2>
        <div className="text-2xl font-bold mb-4 flex justify-between">
          <h1>Total</h1>
          <h1>${room.price * nights}</h1>
        </div>
        <div className="text-sm ml-auto text-right">
          <p>Includes taxes and fees</p>
          <p>In the property's currency: KRW 63,500</p>
        </div>
      </ContainerWithBorders>

      <ContainerWithBorders>
        <h2 className="text-xl font-bold">Your booking info</h2>

        <div className="flex flex-col sm:flex-col md:flex-row justify-between items-center py-3 border-b border-gray-200 gap-3">
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
          <BookingDetail>
            {capitalize(toWords(nights))} {nights > 1 ? "nights" : "night"}
          </BookingDetail>
        </div>

        <div className="py-3">
          <BookingDetailTitle>You have chosen:</BookingDetailTitle>
          <BookingDetail>
            Room for {toWords(capacity)} {capacity > 1 ? "people" : "person"}
          </BookingDetail>
        </div>
      </ContainerWithBorders>

      <ContainerWithBorders>
        <h2 className="text-xl font-bold mb-1">
          What is booking cancellation price?
        </h2>
        <p className="text-green-600 leading-7 text-[13px]">
          Free cancellation before {substituteDaysAndFormatDate(startDate, 3)}.
        </p>
      </ContainerWithBorders>
    </Column>
  );
};

export default BookingDetails;
