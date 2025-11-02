import { useLocation } from "react-router-dom";
import { Room } from "../Types/Room.tsx";
import { Booking } from "../Types/Booking.tsx";
import {
  AlertTriangle,
  CalendarArrowDownIcon,
  CheckIcon,
  XIcon,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store.tsx";
import { User } from "../Types/User.tsx";
import useNavigation from "../Utils/navigate.tsx";
import routers from "../Constants/routers.tsx";
import { formatStringDate } from "../Utils/helpers.tsx";
import ConfirmationCard from "../Feature/BookingDetails/ConfirmationCard.tsx";

const BookingDetails = () => {
  const location = useLocation();
  const { goTo } = useNavigation();

  const { email } = useSelector(
    (root: RootState) => root.authorizedUser.authorizedUser,
  ) as User | null;
  const { state } = location;

  const booking = state?.booking as Booking | undefined;
  const room = state?.room as Room | undefined;

  const room_image = `data:image/png;base64,${room?.image}`;

  if (!booking || !room) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-red-600">
          Booking data is absent
        </h2>
        <p className="mt-2 text-gray-600">Please go back to booking list</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full mb-4">
          <CheckIcon size={18} />
          <span className="font-medium">Booking confirmed</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">
          Your {room.type.toLowerCase()} is ready
        </h1>
        <p className="text-gray-600 mt-2">
          Confirmation sent to <span className="font-medium">{email}</span>
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <img
          alt="Room"
          src={room_image}
          className="w-full max-w-md h-64 object-cover rounded-xl shadow-md"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-7">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-start gap-3 mb-5">
              <div className="p-2 bg-blue-50 rounded-lg mt-1">
                <CalendarArrowDownIcon className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Your stay & room
                </h2>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <p className="text-sm text-gray-500">Check-in</p>
                    <p className="text-xl font-bold">
                      {formatStringDate(booking.start_date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Check-out</p>
                    <p className="text-xl font-bold">
                      {formatStringDate(booking.end_date)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Room details</p>
                  <p className="text-gray-700">
                    {room.capacity} guests • {room.beds} bed
                    {room.beds !== 1 ? "s" : ""} • {room.area} m² • Floor{" "}
                    {room.floor}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
            <div className="flex items-start gap-3">
              <AlertTriangle
                className="text-amber-600 mt-0.5 flex-shrink-0"
                size={20}
              />
              <div>
                <p className="font-medium text-amber-800">Stay safe online</p>
                <p className="text-amber-700 text-sm mt-1">
                  Never share personal or payment details over phone, email, or
                  chat.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-blue-700">
              <strong>Need to change your dates or room?</strong> Editing
              bookings is not available. Please cancel this booking and create a
              new one (rebooking).
            </p>
          </div>

          <button
            className="flex items-center gap-3 px-5 py-3 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg transition-colors font-medium"
            onClick={() =>
              goTo(routers.cancelBooking, { state: { room, booking } })
            }
          >
            <XIcon size={18} />
            Cancel booking
          </button>
        </div>

        <div className="space-y-5">
          <ConfirmationCard confirmationNumber={228} onCopy={
            () => navigator.clipboard.writeText(228)
          }/>

          <ConfirmationCard confirmationNumber={228} onCopy={ () =>
            navigator.clipboard.writeText(228)
          }/>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
