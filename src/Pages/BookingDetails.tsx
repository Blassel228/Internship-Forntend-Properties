import { useLocation } from "react-router-dom";
import { Room } from "../Types/Room.tsx";
import { Booking } from "../Types/Booking.tsx";
import {
  AlertTriangle,
  CalendarArrowDownIcon,
  CheckIcon,
  XIcon,
  HomeIcon,
  BathIcon,
  BedIcon,
  UsersIcon,
  SparklesIcon,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store.tsx";
import { User } from "../Types/User.tsx";
import useNavigation from "../Utils/navigate.tsx";
import routers from "../Constants/routers.tsx";
import { formatStringDate } from "../Utils/helpers.tsx";
import Column from "../Components/Ui/Column.tsx";
import Row from "../Components/Ui/Row.tsx";

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
      <Column className="container mx-auto px-4 py-16 items-center justify-center">
        <h2 className="text-xl font-bold text-red-600">
          Booking data is absent
        </h2>
        <p className="mt-2 text-gray-600">Please go back to booking list</p>
        <button
          onClick={() => goTo(routers.myBookings)}
          className="mt-4 text-blue-600 hover:underline"
        >
          ← Back to bookings
        </button>
      </Column>
    );
  }

  const nights = Math.ceil(
    (new Date(booking.end_date).getTime() -
      new Date(booking.start_date).getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return (
    <Column className="container mx-auto px-4 py-8 max-w-5xl items-center mt-36">
      <Column className="items-center mb-8">
        <Row className="items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full mb-4">
          <CheckIcon size={18} />
          <span className="font-medium">Booking confirmed</span>
        </Row>
        <h1 className="text-2xl font-bold text-gray-800">
          Your {room.type.toLowerCase()} is ready
        </h1>
      </Column>

      <Row className="justify-center mb-8">
        <img
          alt="Room"
          src={room_image}
          className="w-full max-w-md h-64 object-cover rounded-xl shadow-md"
        />
      </Row>

      <Column className="w-full max-w-2xl">
        <Column className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            Your stay & room
          </h2>

          <Row className="gap-4 justify-center items-center mt-4">
            <Row className="p-2 bg-blue-50 rounded-lg">
              <CalendarArrowDownIcon className="text-blue-600" />
            </Row>
            <Column className="items-center">
              <p className="text-sm text-gray-500">Check-in</p>
              <p className="text-xl font-bold">
                {formatStringDate(booking.start_date)}
              </p>
            </Column>
            <Column className="items-center">
              <p className="text-sm text-gray-500">Check-out</p>
              <p className="text-xl font-bold">
                {formatStringDate(booking.end_date)}
              </p>
            </Column>
          </Row>

          {/* Room features */}
          <Row className="mt-5 gap-4 flex-wrap justify-center">
            <Row className="items-center gap-1 text-gray-600">
              <BedIcon size={16} />
              <span>
                {room.beds} bed{room.beds !== 1 ? "s" : ""}
              </span>
            </Row>
            <Row className="items-center gap-1 text-gray-600">
              <BathIcon size={16} />
              <span>
                {room.bathes} bath{room.bathes !== 1 ? "s" : ""}
              </span>
            </Row>
            <Row className="items-center gap-1 text-gray-600">
              <UsersIcon size={16} />
              <span>{room.capacity} guests</span>
            </Row>
            <Row className="items-center gap-1 text-gray-600">
              <span>{room.area}</span>
            </Row>
          </Row>

          {booking.specialRequests && (
            <Column className="mt-5 pt-4 border-t border-gray-100">
              <Row className="items-center gap-2 mb-2">
                <SparklesIcon size={16} className="text-amber-600" />
                <p className="text-sm font-medium text-gray-700">
                  Special requests
                </p>
              </Row>
              <p className="text-gray-700 text-sm italic">
                "{booking.specialRequests}"
              </p>
            </Column>
          )}

          <Row className="mt-5 pt-4 border-t border-gray-100 justify-between items-center">
            <span className="text-gray-600">
              {nights} night{nights !== 1 ? "s" : ""} • Total
            </span>
            <span className="text-lg font-bold text-gray-800">
              ${booking.price}
            </span>
          </Row>
        </Column>

        <Row className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded mt-6">
          <AlertTriangle
            className="text-amber-600 mt-0.5 flex-shrink-0"
            size={20}
          />
          <Column className="ml-3">
            <p className="font-medium text-amber-800">Stay safe online</p>
            <p className="text-amber-700 text-sm mt-1">
              Never share personal or payment details over phone, email, or
              chat.
            </p>
          </Column>
        </Row>

        <Row className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-4">
          <p className="text-sm text-blue-700">
            <strong>Need to change your dates or room?</strong> Editing bookings
            is not available. Please cancel this booking and create a new one
            (rebooking).
          </p>
        </Row>

        <Row className="gap-4 mt-6">
          <button
            className="flex items-center gap-3 px-5 py-3 bg-red-50 cursor-pointer text-red-700 hover:bg-red-100 rounded-lg transition-colors font-medium"
            onClick={() =>
              goTo(routers.cancelBooking, { state: { room, booking } })
            }
          >
            <XIcon size={18} />
            Cancel booking
          </button>
          <button
            onClick={() => goTo(routers.myBookings)}
            className="flex items-center gap-2 px-5 py-3 cursor-pointer text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
          >
            <HomeIcon size={18} />
            My bookings
          </button>
        </Row>
      </Column>
    </Column>
  );
};

export default BookingDetails;
