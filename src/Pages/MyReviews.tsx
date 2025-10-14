import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store.tsx";
import { useBookings, useGetBookingsForRoomsNotRatedByUser } from "../Hooks/useBooking.tsx";
import bookingStatus from "../Enums/bookingStatus.tsx";
import { FileText, Loader2 } from "lucide-react";
import useNavigation from "../Utils/navigate.tsx";
import ReviewCard from "../Components/ReviewCard.tsx";

const MyReviews = () => {
  const [activeTab, setActiveTab] = useState<"all" | "rated" | "unrated">("all");
  const { goTo } = useNavigation();

  const { bookings, isLoading: bookingsLoading, error: bookingsError } = useBookings();
  const {
    notRatedBookings,
    isLoading: notRatedLoading,
    error: notRatedError,
  } = useGetBookingsForRoomsNotRatedByUser();

  const user = useSelector((state: RootState) => state.authorizedUser.authorizedUser);
  const { name, surname, image_data, username } = user || {};

  const pastBookings = useMemo(() => {
    if (!bookings) return [];
    const today = new Date();
    return bookings.filter((b: any) => {
      const endDate = new Date(b.end_date);
      return endDate < today && b.status === bookingStatus.CONFIRMED;
    });
  }, [bookings]);

  const notRatedBookingIds = useMemo(() => {
    return new Set((notRatedBookings || []).map((b: any) => b.id));
  }, [notRatedBookings]);

  const ratedBookings = useMemo(() => {
    return pastBookings.filter((b: any) => !notRatedBookingIds.has(b.id));
  }, [pastBookings, notRatedBookingIds]);

  let displayedBookings = pastBookings;
  let isLoading = bookingsLoading || notRatedLoading;
  let error = bookingsError || notRatedError;

  if (activeTab === "rated") {
    displayedBookings = ratedBookings;
  } else if (activeTab === "unrated") {
    displayedBookings = notRatedBookings || [];
    isLoading = notRatedLoading;
    error = notRatedError;
  }

  const getEmptyState = () => {
    if (activeTab === "all") {
      return {
        title: "No past bookings",
        message: "You don’t have any confirmed stays yet.",
      };
    } else if (activeTab === "rated") {
      return {
        title: "No reviews yet",
        message: "You haven’t reviewed any of your stays.",
      };
    } else {
      return {
        title: "All done!",
        message: "You’ve already reviewed all your eligible stays.",
      };
    }
  };

  return (
    <div className="w-full mt-36 max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {([
          { key: "all", label: "All Bookings", count: pastBookings.length },
          { key: "rated", label: "Reviewed", count: ratedBookings.length },
          { key: "unrated", label: "Need Review", count: notRatedBookings?.length || 0 },
        ] as const).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2.5 rounded-full font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-5 rounded-lg text-center">
          Failed to load data. Please try again later.
        </div>
      ) : displayedBookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 p-4 bg-gray-100 rounded-full">
            <FileText className="text-gray-500 w-12 h-12" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">{getEmptyState().title}</h3>
          <p className="text-gray-500 mt-2 max-w-md">{getEmptyState().message}</p>
        </div>
      ) : (
        <div className="space-y-5">
          {displayedBookings.map((booking: any) => (
            <ReviewCard
              key={booking.id}
              booking={booking}
              isReviewed={!notRatedBookingIds.has(booking.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
