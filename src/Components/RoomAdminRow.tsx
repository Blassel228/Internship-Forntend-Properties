import {Room} from "../Types/Room";
import AdminTablDataCell from "./AdminTablDataCell.tsx";
import AdminTableRow from "./AdminTableRow.tsx";
import Row from "./Row.tsx";

interface RoomAdminRowProps {
  room: Room;
  onEdit: (room: Room) => void;
}

const RoomAdminRow = ({ room, onEdit, onDelete }: RoomAdminRowProps) => {
  const roomUrl = room.image ? `data:image/jpeg;base64,${room.image}` : null;

  return (
    <AdminTableRow>
      <td className="p-3">
        <div className="w-16 h-12 bg-orange-50 overflow-hidden flex items-center justify-center">
          {roomUrl ? (
            <img
              src={roomUrl}
              alt={room.type}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-lg text-orange-300">🏨</span>
          )}
        </div>
      </td>
      <AdminTablDataCell>{room.type}</AdminTablDataCell>
      <AdminTablDataCell>{room.beds}</AdminTablDataCell>
      <AdminTablDataCell>
        {room.capacity} {room.capacity === 1 ? "person" : "people"}
      </AdminTablDataCell>
      <AdminTablDataCell>{room.area}</AdminTablDataCell>
      <AdminTablDataCell>${room.price}</AdminTablDataCell>
      <AdminTablDataCell>
        <Row className="gap-4">
          <div className="flex-1">
            <button
              onClick={() => onEdit(room)}
              className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded transition-colors"
            >
              Edit
            </button>
          </div>

          <button
            onClick={() => onDelete(room)}
            className="flex-1 py-2 bg-red-600 hover:bg-red-800 text-white text-sm font-medium rounded transition-colors"
          >
            Delete
          </button>
        </Row>
      </AdminTablDataCell>
    </AdminTableRow>
  );
};

export default RoomAdminRow;
