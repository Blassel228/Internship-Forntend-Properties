import BookingDetailTitle from "./BookingDetailTitle.tsx";
import BookingDetail from "./BookingDetail.tsx";
import { toWords, toWordsOrdinal } from "number-to-words";
import React from "react";
import {
  addDaysAndFormatDate,
  calculateNights,
  capitalize,
} from "../Utils/helpers.tsx";
import useBookingParams from "../Hooks/useSearchParams.tsx";
import ContainerWithBorders from "./ContainerWithBorders.tsx";
import Column from "./Column.tsx";
import AdditionalRoomInfo from "./AdditionalRoomInfo.tsx";
import dayjs from "dayjs";

const BookingDetails = ({ room }) => {
  const { startDate, endDate, capacity } = useBookingParams();
  let nights = calculateNights(startDate, endDate);

  return (
    <Column className="bookingDetails gap-8">
      <div>
        <img
          src={`data:image/png;base64,${room.image}`}
          className="roomPhoto h-full object-cover rounded "
          alt="Room"
        />
      </div>
      <ContainerWithBorders className="bg-gray-200">
        <AdditionalRoomInfo>{room.type}</AdditionalRoomInfo>
        <div className="flex items-center">
          <p className="bg-orange-500 text-white px-2 py-0.5 text-center rounded mr-1.5">
            7.7{" "}
          </p>
          <span> · Good 28 reviews </span>
        </div>
        <p>
          {room.area} Area, {capitalize(toWordsOrdinal(room.floor))} floor
        </p>
        <Column className="border-b border-t py-4 border-black">
          <h2 className="text-xl font-bold mb-2">Price Details</h2>
          <div className="text-2xl font-bold mb-4 flex justify-between">
            <h1>Total</h1>
            <h1>${room.price * nights}</h1>
          </div>
        </Column>
        <Column className="py-4 border-b border-black">
          <h2 className="text-xl font-bold pb-4">Your booking info</h2>
          <div className="flex justify-between items-center">
            <div>
              <BookingDetailTitle>Check in date</BookingDetailTitle>
              <BookingDetail>{startDate}</BookingDetail>
            </div>
            <div>
              <BookingDetailTitle>Check out date</BookingDetailTitle>
              <BookingDetail>{endDate}</BookingDetail>
            </div>
          </div>
        </Column>

        <div className="py-4 border-b flex border-black justify-between">
          <BookingDetailTitle>Stay duration:</BookingDetailTitle>
          <BookingDetail>
            {capitalize(toWords(nights))} {nights > 1 ? "nights" : "night"}
          </BookingDetail>
        </div>

        <div className="py-4 border-b border-black">
          <BookingDetailTitle>You have chosen:</BookingDetailTitle>
          <BookingDetail>
            Room for {toWords(capacity)} {capacity > 1 ? "people" : "person"}
          </BookingDetail>
        </div>

        <div className="py-4 border-black">
          <h2 className="text-xl font-bold mb-1">
            What is booking cancellation price?
          </h2>
          <p className="text-green-600 leading-7 text-[13px]">
            You can cancel booking for free before{" "}
            {addDaysAndFormatDate(new Date(startDate), 12)}.
          </p>
        </div>
      </ContainerWithBorders>
    </Column>
  );
};

export default BookingDetails;
