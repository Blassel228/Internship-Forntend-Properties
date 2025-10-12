import ReviewsTable from "../Components/ReviewsTable.tsx";
import Row from "../Components/Row.tsx";
import ReviewsPanel from "../Components/ReviewsPanel.tsx";
import {useMemo, useState} from "react";
import {useBookings, useGetBookingsForRoomsNotRatedByUser,} from "../Hooks/useBooking.tsx";
import bookingStatus from "../Enums/bookingStatus.tsx";

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
    return pastBookings.filter(
      (booking) => !notRatedBookingIds.has(booking.id),
    );
  }, [pastBookings, notRatedBookingIds]);

  let displayedBookings = pastBookings;
  let areBookingsLoading = bookingsLoading || notRatedLoading;
  let error = bookingsError || notRatedError;

  if (isSelected === 2) {
    displayedBookings = ratedBookings;
  } else if (isSelected === 3) {
    displayedBookings = notRatedBookings;
    areBookingsLoading = notRatedLoading;
    error = notRatedError;
    console.log("Unrated bookings", displayedBookings);
  }

  const handleSetSelected = (value: number) => {
    setIsSelected(value);
  };

  return (
    <>
      <Row className="mt-36 w-full gap-4 justify-center">
        <ReviewsPanel
          isSelected={isSelected}
          handleSetSelected={handleSetSelected}
          allReviewsCount={pastBookings.length}
          writeReviewCount={notRatedBookings.length}
          propertyReviewsCount={ratedBookings.length}
        />
        <ReviewsTable
          isSelected={isSelected}
          displayedBookings={displayedBookings}
          areBookingsLoading={areBookingsLoading}
          error={error}
        />
      </Row>
    </>
  );
};

export default MyReviews;
