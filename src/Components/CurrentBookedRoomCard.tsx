import { Booking } from "../Types/Booking.tsx";
import useRoom from "../Hooks/useRoom.tsx";
import { AlertTriangle, Image as ImageIcon } from "lucide-react";

interface BookedRoomCardProps {
  booking: Booking;
}

const CurrentBookedRoomCard = ({
  booking,
  handleNavigate,
}: BookedRoomCardProps) => {
  const formatDate = (dateString: string): string => {
    const d = new Date(dateString);
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
  };

  const { room, isLoading, error } = useRoom(booking.room_id);

  if (isLoading) {
    return (
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
        <div className="h-48 bg-gray-300 animate-pulse"></div>
        <div className="p-5">
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error || !booking.room_id) {
    return (
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden border border-red-200">
        <div className="h-48 bg-red-50 flex items-center justify-center">
          <AlertTriangle className="text-red-500" size={48} />
        </div>
        <div className="p-5 text-red-800">
          <h3 className="font-bold">Не вдалося завантажити кімнату</h3>
          <p className="text-sm mt-1">
            {error ? error.message : "Немає ID кімнати"}
          </p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden border border-yellow-200">
        <div className="h-48 bg-yellow-50 flex items-center justify-center">
          <ImageIcon className="text-yellow-500" size={48} />
        </div>
        <div className="p-5 text-yellow-800">
          <h3 className="font-bold">Кімнату не знайдено</h3>
          <p className="text-sm mt-1">ID: {booking.room_id}</p>
        </div>
      </div>
    );
  }

  const image = room.image ? `data:image/jpeg;base64,${room.image}` : undefined;

  return (
    <div
      className="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
      onClick={() => handleNavigate(booking, room)}
    >
      <div className="h-48 w-full bg-gray-100 relative">
        {image ? (
          <img
            alt="Room"
            src={image}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
              (e.target as HTMLImageElement).parentElement!.innerHTML = `
                <div class="w-full h-full flex items-center justify-center bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <path d="M21 15l-5-5L5 21"></path>
                  </svg>
                </div>`;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <ImageIcon size={48} className="text-gray-400" />
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-2">
          {room.type || "Без назви"}
        </h3>
        <p className="text-sm text-gray-600">
          {formatDate(booking.start_date)} — {formatDate(booking.end_date)}
        </p>
      </div>
    </div>
  );
};

export default CurrentBookedRoomCard;
