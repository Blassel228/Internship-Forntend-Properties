import CurrentBookedRoomCard from "../Components/CurrentBookedRoomCard.tsx";
import { useBookings } from "../Hooks/useBooking.tsx";
import Row from "../Components/Row.tsx";
import FullHeader from "../Components/Header/FullHeader.tsx";
import { AlertCircle, Bed, Globe, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import routers from "../Constants/routers.tsx";
import { useEffect, useState } from "react";
import { Booking } from "../Types/Booking.tsx";
import BookedRoomMinorCard from "../Components/BookedRoomMinorCard.tsx";
import { Room } from "../Types/Room.tsx";
import useNavigation from "../Utils/navigate.tsx";
import bookingStatus from "../Enums/bookingStatus.tsx";
import Column from "../Components/Column.tsx";

const UserBookingsPage = () => {
  const { goTo } = useNavigation();

  const [showTimeoutError, setShowTimeoutError] = useState(false);

  const {
    bookings,
    isLoading: areBookingsLoading,
    error,
  }: { bookings: Booking[] } = useBookings();
  const [activeTab, setActiveTab] = useState<"past" | "cancelled">("past");

  const hasError = !!error || showTimeoutError;
  const errorMessage = showTimeoutError
    ? "We couldn’t load your bookings in time. Please check your connection and try again."
    : error?.message || "Unknown error";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentBookings =
    bookings?.filter((booking) => {
      const endDate = new Date(booking.end_date);
      return endDate >= today && booking.status === bookingStatus.CONFIRMED;
    }) || [];

  const pastBookings =
    bookings?.filter((booking) => {
      const endDate = new Date(booking.end_date);
      return endDate < today && booking.status === bookingStatus.CONFIRMED;
    }) || [];

  const cancelledBookings =
    bookings?.filter((booking) => {
      return (
        booking.status === bookingStatus.CANCELLED ||
        booking.status === bookingStatus.REFUNDED
      );
    }) || [];

  const handleNavigate = (booking: Booking, room: Room) => {
    goTo(routers.bookingDetails, { state: { room, booking } });
  };

  pastBookings.sort((a, b) => {
    return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
  });

  cancelledBookings.sort((a, b) => {
    return new Date(b.end_date).getTime() - new Date(a.end_date).getTime();
  });

  useEffect(() => {
    let timeoutId;

    if (areBookingsLoading) {
      timeoutId = setTimeout(() => {
        setShowTimeoutError(true);
      }, 10_000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [areBookingsLoading]);

  if (areBookingsLoading && !showTimeoutError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <Loader2 className="animate-spin text-blue-500" size={48} />
        <p className="mt-4 text-gray-600">Завантажуємо ваші бронювання...</p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Column className="p-8 text-center max-w-md w-full">
          <AlertCircle className="mx-auto text-red-500" size={48} />
          <h3 className="mt-4 text-lg font-medium text-red-700">
            Couldn't load bookings.
          </h3>
          <p className="text-red-500 mt-2">{errorMessage}</p>
          <div className="mt-6">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 w-36 bg-red-600 text-white rounded hover:bg-red-700 transition mx-auto"
            >
              Try Again
            </button>
          </div>
        </Column>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <>
        <FullHeader />
        <div className="container mx-auto px-4 py-8 mt-36 lg:w-[70%]">
          <div className="flex flex-col items-center justify-center py-16 px-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg">
            <div className="text-center">
              <Globe
                className="mx-auto text-indigo-500"
                size={120}
                strokeWidth={1}
              />
              <h2 className="mt-8 text-3xl font-extrabold text-gray-800">
                Where are we going?
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-md">
                You haven’t booked any rooms yet. Explore our catalog and find
                the perfect place for your next adventure.
              </p>
              <Link
                to={routers.home}
                className="mt-8 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow transition"
              >
                <Bed size={20} />
                Browse Rooms
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  const activeBookings =
    activeTab === "past" ? pastBookings : cancelledBookings;

  return (
    <>
      <FullHeader />
      <div className="container mx-auto px-4 py-8 mt-36 lg:w-[70%]">
        <h1 className="text-2xl text-center font-bold mb-8">My bookings</h1>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Current bookings
          </h2>

          {currentBookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
              <Globe
                className="mx-auto text-orange-500"
                size={80}
                strokeWidth={1}
              />
              <h3 className="mt-6 text-xl font-bold text-gray-800">
                No upcoming trips
              </h3>
              <p className="mt-2 text-gray-600">
                Looks like you don’t have any current bookings.
              </p>
              <Link
                to={routers.home}
                className="mt-6 inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-5 rounded-lg shadow transition"
              >
                <Bed size={16} />
                Find a Room
              </Link>
            </div>
          ) : (
            <Row className="gap-6 flex-wrap justify-center">
              {currentBookings.map((booking) => (
                <CurrentBookedRoomCard
                  key={`current-${booking.id}`}
                  booking={booking}
                  className="w-full sm:w-[300px]"
                  handleNavigate={handleNavigate}
                />
              ))}
            </Row>
          )}
        </section>

        <section className="mb-8">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveTab("past")}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 shadow-sm min-w-[100px] ${
                activeTab === "past"
                  ? "bg-orange-500 text-white shadow-md hover:bg-orange-600"
                  : "bg-orange-100 text-orange-700 hover:bg-orange-200 border border-orange-200"
              }`}
            >
              Past
            </button>
            <button
              onClick={() => setActiveTab("cancelled")}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 shadow-sm min-w-[100px] ${
                activeTab === "cancelled"
                  ? "bg-orange-500 text-white shadow-md hover:bg-orange-600"
                  : "bg-orange-100 text-orange-700 hover:bg-orange-200 border border-orange-200"
              } ${cancelledBookings.length === 0 ? "opacity-60" : "cursor-pointer"}`}
              disabled={cancelledBookings.length === 0}
              title={
                cancelledBookings.length === 0
                  ? "No cancelled bookings yet"
                  : ""
              }
            >
              Cancelled
            </button>
          </div>
        </section>

        <section>
          {activeBookings.length > 0 ? (
            <Row className="gap-4 flex-wrap justify-center">
              {activeBookings.map((booking) => (
                <BookedRoomMinorCard
                  key={`${activeTab}-${booking.id}`}
                  booking={booking}
                  className="w-full sm:w-[300px]"
                  handleNavigate={handleNavigate}
                />
              ))}
            </Row>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
              <h3 className="mt-6 text-xl font-bold text-gray-800">
                You haven’t completed any stays yet. Your first adventure is
                waiting!
              </h3>
              <p className="mt-2 text-gray-600">No bookings have been made.</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default UserBookingsPage;
