// BookingDetails.tsx
import BookingDetailTitle from "./BookingDetailTitle.tsx";
import BookingDetail from "./BookingDetail.tsx";
import { toWords, toWordsOrdinal } from "number-to-words";
import React from "react";
import {
  addDaysAndFormatDate,
  calculateNights,
  capitalize,
  getRatingLabel,
} from "../Utils/helpers.tsx";
import useBookingParams from "../Hooks/useSearchParams.tsx";
import ContainerWithBorders from "./ContainerWithBorders.tsx";
import Column from "./Column.tsx";
import { StarIcon } from "lucide-react";

const BookingDetails = ({ room, reviewCount }) => {
  const { startDate, endDate, capacity } = useBookingParams();
  const nights = calculateNights(startDate, endDate);

  return (
    <Column className="bookingDetails gap-4">
      <div className="w-full">
        <img
          src={`data:image/png;base64,${room.image}`}
          className="w-full h-48 sm:h-60 object-cover rounded-lg"
          alt="Room"
        />
      </div>

      <ContainerWithBorders className="bg-gray-50 p-3 sm:p-4 rounded-lg">
        <h1 className="text-lg font-bold text-gray-900 mb-1">{room.type}</h1>

        {room.average_rating !== undefined && (
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <div className="flex items-center bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
              <span className="font-bold text-orange-700 text-sm">
                {room.average_rating}
              </span>
              <StarIcon className="text-orange-500 fill-orange-500 ml-1" size={12} />
            </div>

            {reviewCount > 0 && (
              <span className="text-gray-700 text-xs">
                {getRatingLabel(room.average_rating)} · {reviewCount}{" "}
                {reviewCount === 1 ? "review" : "reviews"}
              </span>
            )}
            {reviewCount === 0 && room.average_rating && (
              <span className="text-gray-600 text-xs italic">No reviews yet</span>
            )}
          </div>
        )}

        <p className="text-gray-600 text-xs mt-1">
          {room.area} m² · {capitalize(toWordsOrdinal(room.floor))} floor
        </p>

        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="text-base font-bold flex justify-between">
            <span>Total</span>
            <span>${room.price * nights}</span>
          </div>
        </div>

        <div className="pt-2 mt-2 border-t border-gray-200">
          <div className="flex justify-between text-xs">
            <span>Check-in</span>
            <span>{startDate}</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span>Check-out</span>
            <span>{endDate}</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span>Duration</span>
            <span>
              {nights} {nights === 1 ? "night" : "nights"}
            </span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span>Guests</span>
            <span>
              {capacity} {capacity === 1 ? "person" : "people"}
            </span>
          </div>
        </div>

        <div className="pt-2 mt-2 border-t border-gray-200">
          <p className="text-green-600 text-xs">
            Free cancellation before{" "}
            {addDaysAndFormatDate(new Date(startDate), 12)}
          </p>
        </div>
      </ContainerWithBorders>
    </Column>
  );
};

export default BookingDetails;