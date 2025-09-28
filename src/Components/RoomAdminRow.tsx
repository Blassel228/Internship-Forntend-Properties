import { Room } from "../Types/Room.tsx";
import { getItem } from "../Utils/localStorage.tsx";
import useNavigation from "../Utils/navigate.tsx";
import routers from "../Constants/routers.tsx";

interface RoomAdminRowProps {
  room: Room;
}

const RoomAdminRow = ({ room }: RoomAdminRowProps) => {
  const { goTo } = useNavigation();

  const avatarUrl =
    room.image && getItem("token")
      ? `data:image/jpeg;base64,${room.image}`
      : null;

  return (
    <tr
      key={room.id}
      className="border-b border-orange-100 hover:bg-orange-50 transition-colors"
    >
      <td className="p-3">
        <div className="w-16 h-12 bg-orange-50 overflow-hidden flex items-center justify-center">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={room.type}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-lg text-orange-300">🏨</span>
          )}
        </div>
      </td>
      <td className="p-3 font-medium text-gray-800">{room.type}</td>
      <td className="p-3 text-gray-700">
        {room.capacity} {room.capacity === 1 ? "person" : "people"}
      </td>
      <td className="p-3 text-gray-700">{room.area}</td>
      <td className="p-3 font-semibold text-gray-900">${room.price}</td>
      <td className="p-3">
        <button
          onClick={() => goTo(routers.adminEditRoom, { room })}
          className="px-8 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded transition-colors"
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default RoomAdminRow;
