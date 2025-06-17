import FullHeader from "../Components/Header/FullHeader.tsx";
import Row from "../Components/Row.tsx";
import Column from "../Components/Column.tsx";
import React from "react";
import { useLocation } from "react-router-dom";
import { Room } from "../Types/types.tsx";
import { toWordsOrdinal  } from 'number-to-words';
import BookingDetails from "../Components/BookingDetails.tsx";
import BasicDetailsInputSection from "../Components/BasicDetailsInputSection.tsx";
import AdditionalRoomInfo from "../Components/AdditionalRoomInfo.tsx";
import capitalize from "../Utils/capitalize.tsx";
import calculaterNights from "../Utils/calculateNights.tsx";
import useSearchParams from "../Hooks/useSearchParams.tsx";
import substituteDaysAndFormatDate from "../Utils/substituteDaysAndFormatDate.tsx";

const BookPage = () => {
  const location = useLocation();
  const room: Room = location.state?.room;
  const { startDate, endDate } = useSearchParams();

  let nights = calculaterNights(startDate, endDate);
  return (
    <div className="w-full justify-center flex">
      <FullHeader />
      <Row className="view items-center gap-5 justify-center mt-36 mx-44">
        <Column className="bookingDetails gap-5">
          <Column className="roomInfo">
            <img
              src={`data:image/png;base64,${room.image}`}
              className="roomPhoto h-full object-cover rounded-t-md "
              alt="Room"
            />
            <Column className="roomDetails border-gray-300 border w-full px-5 py-3 gap-3 rounded-b-md">
              <AdditionalRoomInfo>{room.type}</AdditionalRoomInfo>
              <div className="flex items-center">
                <p className="bg-orange-500 text-white px-2 py-0.5 text-center rounded mr-1.5">7.7 </p>
                <span> · Good 28 reviews </span>
              </div>
              <p>{room.area} Area, {capitalize(toWordsOrdinal(room.floor))} floor</p>
              <p></p>
            </Column>
          </Column>
          <Column className="priceDetails border-gray-300 border w-full px-5 py-3 gap-1 rounded-b-md">
            <h2 className="text-xl font-bold mb-2">Price Details</h2>
            <div className="text-2xl font-bold mb-4 flex justify-between">
              <h1>Total</h1><h1>${room.price * nights}</h1>
            </div>
            <div className="text-sm ml-auto text-right">
              <p>Includes taxes and fees</p>
              <p>In the property's currency: KRW 63,500</p>
            </div>
          </Column>
          <BookingDetails />
          <Column className="roomDetails border-gray-300 border w-full px-5 pt-3 pb-1 gap-3 rounded-b-md">
             <h2 className="text-xl font-bold mb-1">What is booking cancellation price?</h2>
              <p className="text-green-600 leading-7 text-[13px]">Free cancellation before {substituteDaysAndFormatDate(startDate, 3)}.</p>
          </Column>
        </Column>
        <Column className="userInfoSection w-full h-full items-center">
          <BasicDetailsInputSection />
          <Column className="gap-2 border-gray-300 border w-full p-3 rounded mt-5">
            <h1 className="font-bold text-xl">Useful to know</h1>
            <p className="leading-7">
              Keep yourself free: you can cancel booking for free before 17th of July,
              so make a booking for this wonderful price now!
            </p>
          </Column>
        </Column>
      </Row>
    </div>
  );
};

export default BookPage;