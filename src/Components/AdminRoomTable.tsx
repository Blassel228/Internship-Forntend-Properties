import { Room } from "../Types/Room.tsx";
import RoomAdminRow from "./RoomAdminRow.tsx";
import { AlertCircle, Loader2 } from "lucide-react";

interface RoomAdminTableProps {
  rooms: Room[];
  isLoading: boolean;
  error?: unknown;
}

const AdminRoomTable = ({ rooms, isLoading, error }: RoomAdminTableProps) => {
  if (error) {
    return (
      <div className="flex items-center justify-center p-8 border border-orange-200 rounded-lg mb-4 w-[60rem]">
        <div className="text-center">
          <AlertCircle className="mx-auto text-red-500" size={48} />
          <h3 className="mt-4 text-lg font-medium text-red-700">Couldn't load rooms.</h3>
          <p className="text-red-500 mt-2">Something went wrong</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-orange-200 rounded-lg mb-4 w-[60rem]">
        <Loader2 className="animate-spin text-blue-500" size={48} />
        <p className="mt-4 text-gray-600">Завантажуємо кімнати...</p>
      </div>
    );
  }

  if (!rooms || rooms.length === 0) {
    return (
      <div className="flex items-center justify-center p-12 border border-orange-200 rounded-lg mb-4 w-[60rem]">
        <p className="text-gray-500">No rooms found</p>
      </div>
    );
  }

  // 4. Нормальний вивід
  return (
    <div className="w-[60rem] border border-orange-200 rounded-lg mb-4">
      <table className="w-full min-w-full">
        <thead>
          <tr className="bg-orange-50 text-orange-800 text-sm font-semibold">
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Capacity</th>
            <th className="p-3 text-left">Area</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <RoomAdminRow key={room.id} room={room} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRoomTable;