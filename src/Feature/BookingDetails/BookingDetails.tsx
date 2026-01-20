import { toWordsOrdinal } from "number-to-words";
import React from "react";
import {
  addDaysAndFormatDate,
  calculateNights,
  capitalize,
  getRatingLabel,
} from "../../Utils/helpers.tsx";
import useBookingParams from "../../Hooks/useSearchParams.tsx";
import ContainerWithBorders from "../../Components/Ui/ContainerWithBorders.tsx";
import Column from "../../Components/Ui/Column.tsx";
import NotRatedTag from "../../Components/Ui/NotRatedTag.tsx";
import useAverageRating from "../../Hooks/useAverageRating.tsx";
import RatingWithStar from "../../Components/Ui/RatingWithStar.tsx";

const BookingDetails = ({ room, reviewCount }) => {
  const { startDate, endDate, capacity } = useBookingParams();
  const nights = calculateNights(startDate, endDate);
  const { averageRating } = useAverageRating(room.id);

  const hasRating = averageRating !== null && averageRating !== undefined;

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
          {!hasRating ? (
          <div className="w-[30%]">
            <NotRatedTag color={"orange"} />
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <RatingWithStar rating={averageRating} />
            {reviewCount > 0 && (
              <span className="text-gray-700 text-xs">
                {getRatingLabel(averageRating)} · {reviewCount}{" "}
                {reviewCount === 1 ? "review" : "reviews"}
              </span>
            )}
          </div>
        )}

        <p className="text-gray-600 text-xs mt-1">
          {room.total_space} m² · {capitalize(toWordsOrdinal(room.floor))} floor
        </p>

        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="text-base font-bold flex justify-between">
            <span>Total</span>
            <span>${(room.price * nights).toFixed(2)}</span>
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