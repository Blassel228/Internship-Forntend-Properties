import Row from "./Row.tsx";
import Column from "./Column.tsx";
import {Booking} from "../Types/Booking.tsx";
import useRoom from "../Hooks/useRoom.tsx";
import {AlertTriangle, Image as ImageIcon} from "lucide-react";
import {formatStringDate} from "../Utils/helpers.tsx";

interface BookedRoomCardProps {
  booking: Booking;
  handleNavigate: void;
}

const BookedRoomMinorCard = ({
  booking,
  handleNavigate,
}: BookedRoomCardProps) => {
  const { room, isLoading, error } = useRoom(booking.room_id);

  if (isLoading) {
    return (
      <Row className="gap-4 p-4 border border-gray-200 rounded-lg shadow animate-pulse bg-white">
        <div className="roomImage bg-gray-300 rounded-md h-16 w-16"></div>
        <Column className="roomInfo justify-center">
          <div className="h-4 bg-gray-300 rounded w-24"></div>
          <div className="h-4 bg-gray-300 rounded w-32 mt-2"></div>
        </Column>
      </Row>
    );
  }

  if (error || !booking.room_id) {
    return (
      <Row className="gap-4 p-4 border border-red-200 rounded-lg bg-red-50 text-red-800 shadow">
        <AlertTriangle size={32} className="text-red-500 flex-shrink-0" />
        <Column className="roomInfo justify-center">
          <div className="font-medium">Couldn`t load the room</div>
          <div className="text-sm">
            {error ? error.message : "Something went wrong"}
          </div>
        </Column>
      </Row>
    );
  }

  if (!room) {
    return (
      <Row className="gap-4 p-4 border border-yellow-200 rounded-lg bg-yellow-50 text-yellow-800 shadow">
        <ImageIcon size={32} className="text-yellow-500 flex-shrink-0" />
        <Column className="roomInfo justify-center">
          <div className="font-medium">Couldn`t find the room</div>
          <div className="text-sm">ID: {booking.room_id}</div>
        </Column>
      </Row>
    );
  }

  const image = room.image ? `data:image/jpeg;base64,${room.image}` : undefined;

  return (
    <Row className="gap-4 p-4 border border-gray-200 rounded-lg shadow hover:shadow-md transition-all duration-200 bg-white cursor-pointer">
      <div className="roomImage flex-shrink-0">
        {image ? (
          <img
            alt="Room"
            src={image}
            className="rounded-md h-16 w-16 object-cover border border-gray-100"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "";
              (e.target as HTMLImageElement).parentElement!.innerHTML = `
                <div class="bg-gray-100 rounded-md h-16 w-16 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <path d="M21 15l-5-5L5 21"></path>
                  </svg>
                </div>`;
            }}
          />
        ) : (
          <div className="bg-gray-100 rounded-md h-16 w-16 flex items-center justify-center">
            <ImageIcon size={24} className="text-gray-400" />
          </div>
        )}
      </div>
      <Column className="roomInfo justify-center">
        <div className="font-semibold text-gray-800">
          {room.type || "Without name"}
        </div>
        <div className="text-sm text-gray-600">
          {formatStringDate(booking.start_date)} —{" "}
          {formatStringDate(booking.end_date)}
        </div>
      </Column>
    </Row>
  );
};

export default BookedRoomMinorCard;
