import {useEffect, useState} from "react";
import { Room } from "../Types/Room";
import RoomAdminRow from "./RoomAdminRow";
import RoomEditModal from "./RoomEditModal";
import { AlertCircle, Loader2 } from "lucide-react";
import RoomDeleteModal from "./RoomDeleteModal.tsx";

interface RoomAdminTableProps {
  rooms: Room[];
  isLoading: boolean;
  error?: unknown;
}

const AdminRoomTable = ({ rooms, isLoading, error }: RoomAdminTableProps) => {
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [deletingRoom, setDeletingRoom] = useState<Room, null>(null);

  const handleEdit = (room: Room) => {
    setEditingRoom(room);
  };

  const handleDelete = (room: Room) => {
    setDeletingRoom(room);
  }

  const handleCloseEditingModal = () => {
    setEditingRoom(null);
  };

  const handleCloseDeletingModal = () => {
    setDeletingRoom(null);
  };

  useEffect(() => {
    console.log("ROOM IN TABLE: ", editingRoom)
  }, [editingRoom])

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
        <p className="mt-4 text-gray-600">Loading rooms...</p>
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

  return (
    <>
      <div className="w-[60rem] border border-orange-200 rounded-lg mb-4">
        <table className="w-full min-w-full table-fixed">
          <thead>
            <tr className="bg-orange-50 text-orange-800 text-sm font-semibold">
              <th className="w-30 p-3 text-left">Image</th>
              <th className="w-30 p-3 text-left">Type</th>
              <th className="w-20 p-3 text-left">Beds</th>
              <th className="w-30 p-3 text-left">Capacity</th>
              <th className="w-40 p-3 text-left">Area</th>
              <th className="w-30 p-3 text-left">Price</th>
              <th className="w-40 p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <RoomAdminRow
                key={room.id}
                room={room}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      <RoomEditModal
        room={editingRoom}
        isOpen={!!editingRoom}
        onClose={handleCloseEditingModal}
      />

       <RoomDeleteModal
        room={deletingRoom}
        isOpen={!!deletingRoom}
        onClose={handleCloseDeletingModal}
      />
    </>
  );
};

export default AdminRoomTable;