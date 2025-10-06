import Column from "./Column.tsx";
import ReviewCard from "./ReviewCard.tsx";
import { FileIcon } from "lucide-react";
import { Loader2 } from "lucide-react";

interface ReviewsTableProps {
  isSelected: number;
}

const ReviewsTable = ({
  isSelected,
  displayedBookings,
  areBookingsLoading,
  error,
}: ReviewsTableProps) => {
  if (areBookingsLoading) {
    return (
      <Column className="w-7/12">
        <div className="flex justify-center items-center h-12">
          <Loader2 className="animate-spin" />
        </div>
      </Column>
    );
  }

  if (error) {
    return (
      <Column className="w-7/12">
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
      <Column className="w-7/12 justify-center items-center py-12">
        <FileIcon size={76} className="text-gray-400 mb-4" />
        <p className="text-gray-500 text-center">{message}</p>
      </Column>
    );
  }

  return (
    <Column className="w-7/12">
      {displayedBookings.map((booking) => (
        <ReviewCard key={booking.id} booking={booking} />
      ))}
    </Column>
  );
};

export default ReviewsTable;
