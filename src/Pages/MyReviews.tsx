import ReviewsTable from "../Components/ReviewsTable.tsx";
import ReviewsPanel from "../Components/ReviewsPanel.tsx";
import { useMemo, useState } from "react";
import { useBookings, useGetBookingsForRoomsNotRatedByUser } from "../Hooks/useBooking.tsx";
import bookingStatus from "../Enums/bookingStatus.tsx";
import Column from "../Components/Column.tsx";

const MyReviews = () => {
  const [isSelected, setIsSelected] = useState<number>(1);

  const {
    bookings,
    isLoading: bookingsLoading,
    error: bookingsError,
  } = useBookings();

  const {
    notRatedBookings,
    isLoading: notRatedLoading,
    error: notRatedError,
  } = useGetBookingsForRoomsNotRatedByUser();

  const pastBookings = useMemo(() => {
    return (bookings || []).filter((booking) => {
      const today = new Date();
      const endDate = new Date(booking.end_date);
      return endDate < today && booking.status === bookingStatus.CONFIRMED;
    });
  }, [bookings]);

  const notRatedBookingIds = useMemo(() => {
    return new Set(notRatedBookings?.map((b) => b.id));
  }, [notRatedBookings]);

  const ratedBookings = useMemo(() => {
    return pastBookings.filter((booking) => !notRatedBookingIds.has(booking.id));
  }, [pastBookings, notRatedBookingIds]);

  let displayedBookings = pastBookings;
  let areBookingsLoading = bookingsLoading || notRatedLoading;
  let error = bookingsError || notRatedError;

  if (isSelected === 2) {
    displayedBookings = ratedBookings;
  } else if (isSelected === 3) {
    displayedBookings = notRatedBookings || [];
    areBookingsLoading = notRatedLoading;
    error = notRatedError;
  }

  const handleSetSelected = (value: number) => {
    setIsSelected(value);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-32">
      <Column className="gap-6 sm:gap-8 items-center w-full">
        <div className="w-full max-w-2xl">
          <ReviewsPanel
            isSelected={isSelected}
            handleSetSelected={handleSetSelected}
            allReviewsCount={pastBookings.length}
            writeReviewCount={notRatedBookings?.length || 0}
            propertyReviewsCount={ratedBookings.length}
          />
        </div>
        <div className="w-full max-w-2xl">
          <ReviewsTable
            isSelected={isSelected}
            displayedBookings={displayedBookings}
            areBookingsLoading={areBookingsLoading}
            error={error}
            notRatedBookingIds={notRatedBookingIds}
          />
        </div>
      </Column>
    </div>
  );
};

export default MyReviews;