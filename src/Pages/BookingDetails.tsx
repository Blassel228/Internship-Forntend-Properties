import { useLocation } from "react-router-dom";
import { Room } from "../Types/Room.tsx";
import { Booking } from "../Types/Booking.tsx";
import {
  AlertTriangle,
  CalendarArrowDownIcon,
  CheckIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store.tsx";
import { User } from "../Types/User.tsx";
import Row from "../Components/Row.tsx";
import Column from "../Components/Column.tsx";
import FullHeader from "../Components/Header/FullHeader.tsx";
import useNavigation from "../Utils/navigate.tsx";
import routers from "../Constants/routers.tsx";
import { formatDate } from "../Utils/helpers.tsx";

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
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-xl font-bold text-red-600">
          Дані бронювання відсутні
        </h2>
        <p className="mt-2 text-gray-600">
          Схоже, ви перейшли сюди безпосередньо. Поверніться до списку
          бронювань.
        </p>
      </div>
    );
  }

  return (
    <>
      <FullHeader />
      <Column className="container mx-auto px-4 py-8 w-[70%] mt-36">
        <h1 className="text-sm  mb-6 text-green-500">
          Your booking is confirmed
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-bold text-lg mb-2">
                Your {room?.type} booking is confirmed
              </h2>
              <Row className="align-center gap-4">
                <CheckIcon />
                You are all set. The confirmation is sent to {email}.
              </Row>
            </div>

            <p className="text-2xl font-bold">{room.type}</p>

            <Column className="shadow p-4">
              <Row className="gap-4">
                <AlertTriangle />
                <p className="font-bold">Stay safe online</p>
              </Row>
              <p>
                Protect your security by never sharing your personal or credit
                card information over the phone, by email or chat.
              </p>
            </Column>
            <Row className="justify-between">
              <Row className="gap-4 justify-center align-center items-center">
                <CalendarArrowDownIcon />
                <Column className="border-r pr-4">
                  <p>Check-in</p>
                  <p className="font-bold text-lg">
                    {formatDate(booking.start_date)}
                  </p>
                </Column>
                <Column>
                  <p>Check-out</p>
                  <p className="font-bold text-lg">
                    {formatDate(booking.end_date)}
                  </p>
                </Column>
              </Row>
              <img
                alt="Room image"
                src={room_image}
                className="w-36 h-28 rounded"
              />
            </Row>

            <Row className="gap-4">
              <MenuIcon />
              <Column>
                <p className="font-bold">Booking Details</p>
                <p>
                  Capacity: {room.capacity}, Beds: {room.beds}, Area:{" "}
                  {room.area}, Floor: {room.floor}
                </p>
              </Column>
            </Row>

            <div>
              <h3 className="font-semibold">Address</h3>
              <button className="text-blue-600 hover:underline">
                4759 Smith Road, North Fairfield, Ohio, USA
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold">Confirmation number</h3>
              {/*<p className="font-mono text-lg">{booking.confirmation_number}</p>*/}
              <button
                // onClick={() => navigator.clipboard.writeText(booking.confirmation_number)}
                className="text-sm text-blue-600 hover:underline mt-1"
              >
                Copy
              </button>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold">PIN code</h3>
              {/*<p className="font-mono text-lg">{booking.pin_code}</p>*/}
              <button
                // onClick={() => navigator.clipboard.writeText(booking.pin_code)}
                className="text-sm text-blue-600 hover:underline mt-1"
              >
                Copy
              </button>
            </div>

            <Column className="border border-gray-300 px-4 pb-4">
              <Row
                className="gap-4 bg-blue-50 p-4 -mx-4"
                onClick={() =>
                  goTo(routers.cancelBooking, { state: { room, booking } })
                }
              >
                <XIcon />
                <p className="font-bold">Cancel your booking</p>
              </Row>
              <Column className="mt-4">
                <p className="font-bold">Contact property</p>
                <p>Phone +44 121 622 8811</p>
                <p>You can send us a message on all platforms including: </p>
                <ul className="list-disc pl-4">
                  <li>Telegram</li>
                  <li>Viber</li>
                  <li>WhatsUp</li>
                </ul>
              </Column>
            </Column>
          </div>
        </div>
      </Column>
    </>
  );
};

export default BookingDetails;
