import CurrentBookedRoomCard from "../Components/CurrentBookedRoomCard.tsx";
import useBookings from "../Hooks/useBookings.tsx";
import Row from "../Components/Row.tsx";
import FullHeader from "../Components/Header/FullHeader.tsx";
import { AlertCircle, Loader2, Globe, Bed } from "lucide-react";
import { Link } from "react-router-dom";
import routers from "../Constants/routers.tsx";
import { useState } from "react";
import { Booking } from "../Types/Booking.tsx";
import PastBookedRoomCard from "../Components/PastBookedRoomCard.tsx";

const UserBookingsPage = () => {
  const { bookings, isLoading: areBookingsLoading, error } = useBookings();
  const [activeTab, setActiveTab] = useState<"past" | "cancelled">("past");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentBookings = bookings?.filter(booking => {
    const endDate = new Date(booking.end_date);
    return endDate >= today;
  }) || [];

  const pastBookings = bookings?.filter(booking => {
    const endDate = new Date(booking.end_date);
    return endDate < today;
  }) || [];

  const cancelledBookings: Booking[] = [];

  pastBookings.sort((a, b) => {
    return new Date(b.end_date).getTime() - new Date(a.end_date).getTime();
  });

  if (areBookingsLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <Loader2 className="animate-spin text-blue-500" size={48} />
        <p className="mt-4 text-gray-600">Завантажуємо ваші бронювання...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <AlertCircle className="mx-auto text-red-500" size={48} />
        <h3 className="mt-4 text-lg font-medium text-red-700">Could't load bookings.</h3>
        <p className="text-red-500">{error.message}</p>
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
              <Globe className="mx-auto text-indigo-500" size={120} strokeWidth={1} />
              <h2 className="mt-8 text-3xl font-extrabold text-gray-800">
                Where are we going?
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-md">
                You haven’t booked any rooms yet. Explore our catalog and find the perfect place for your next adventure.
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

  const activeBookings = activeTab === "past" ? pastBookings : cancelledBookings;

  return (
    <>
      <FullHeader />
      <div className="container mx-auto px-4 py-8 mt-36 lg:w-[70%]">
        <h1 className="text-2xl text-center font-bold mb-8">My bookings</h1>

       <section className="mb-12">
  <h2 className="text-xl font-bold text-gray-800 mb-4">Current bookings</h2>

          {currentBookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
              <Globe className="mx-auto text-orange-500" size={80} strokeWidth={1} />
              <h3 className="mt-6 text-xl font-bold text-gray-800">No upcoming trips</h3>
              <p className="mt-2 text-gray-600">Looks like you don’t have any current bookings.</p>
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
              } ${cancelledBookings.length === 0 ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
              disabled={cancelledBookings.length === 0}
              title={cancelledBookings.length === 0 ? "No cancelled bookings yet" : ""}
            >
              Cancelled
            </button>
          </div>
        </section>

        <section>
          {activeBookings.length > 0 ? (
            <Row className="gap-4 flex-wrap justify-center">
              {activeBookings.map((booking) => (
                <PastBookedRoomCard
                  key={`${activeTab}-${booking.id}`}
                  booking={booking}
                  className="w-full sm:w-[300px]"
                />
              ))}
            </Row>
          ) : (
            <div className="text-center py-8">
              <div className="inline-block p-4 bg-gray-50 rounded-xl">
                <p className="text-gray-500">
                  {activeTab === "past"
                    ? "No past bookings yet"
                    : "No cancelled bookings yet"}
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default UserBookingsPage;