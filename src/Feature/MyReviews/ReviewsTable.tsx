import Column from "../../Components/Ui/Column.tsx";
import { FileIcon, Loader2 } from "lucide-react";
import UserReviewCard from "./UserReviewCard.tsx";

interface ReviewsTableProps {
  isSelected: number;
  displayedBookings: any[];
  areBookingsLoading: boolean;
  error: unknown;
  notRatedBookingIds: Set<number | string>;
}

const ReviewsTable = ({
  isSelected,
  displayedBookings,
  areBookingsLoading,
  error,
  notRatedBookingIds,
}: ReviewsTableProps) => {
  console.log("REVIEWS: ", displayedBookings);
  if (areBookingsLoading) {
    return (
      <Column className="w-full justify-center items-center py-12">
        <Loader2 className="animate-spin text-gray-500" size={24} />
      </Column>
    );
  }

  if (error) {
    return (
      <Column className="w-full justify-center items-center py-12">
        <p className="text-red-500 text-center">
          Failed to load data. Please try again later.
        </p>
      </Column>
    );
  }

  if (displayedBookings.length === 0) {
    let message = "";
    if (isSelected === 1)
      message = "You don’t have any past confirmed bookings.";
    else if (isSelected === 2) message = "You haven’t left any reviews yet.";
    else if (isSelected === 3) message = "All your stays have been reviewed!";

    return (
      <Column className="w-full justify-center items-center py-12 px-4">
        <FileIcon size={64} className="text-gray-400 mb-4" />
        <p className="text-gray-500 text-center max-w-md">{message}</p>
      </Column>
    );
  }

  return (
    <div className="w-full">
      <Column className="md:grid-cols-2 gap-6">
        {displayedBookings.map((booking) => (
          <UserReviewCard
            key={booking.id}
            booking={booking}
            isReviewable={notRatedBookingIds.has(booking.id)}
          />
        ))}
      </Column>
    </div>
  );
};

export default ReviewsTable;
