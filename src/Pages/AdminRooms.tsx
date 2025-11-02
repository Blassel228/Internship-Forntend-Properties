import React, { useState } from "react";
import { Room, RoomFilters } from "../Types/Room";
import { useRoomsWithFilters } from "../Hooks/useRooms.tsx";
import AdminRoomCreateModal from "../Feature/AdminRoom/Components/AdminRoomCreateModal.tsx";
import RoomEditModal from "../Feature/AdminRoom/Components/RoomEditModal.tsx";
import RoomDeleteModal from "../Feature/AdminRoom/Components/RoomDeleteModal.tsx";
import DataTable from "../Components/Table/DataTable";
import RoomImageCell from "../Components/Table/RoomImageCell";
import TableColumn from "../Types/Table";
import AdminRoomFilter from "../Feature/AdminRoom/Components/AdminRoomFilter.tsx";
import Row from "../Components/Row.tsx";

function AdminRooms() {
  const [filters, setFilters] = useState<RoomFilters>({});
  const { roomsWithFilters, isLoading, isError, error } =
    useRoomsWithFilters(filters);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [deletingRoom, setDeletingRoom] = useState<Room | null>(null);

  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openEditModal = (room: Room) => {
    setEditingRoom(room);
  };

  const closeEditModal = () => setEditingRoom(null);

  const openDeleteModal = (room: Room) => setDeletingRoom(room);
  const closeDeleteModal = () => setDeletingRoom(null);

  const handleFilterSubmit = (newFilters: RoomFilters) => {
    setFilters(newFilters);
  };

  const columns: TableColumn<Room>[] = [
    {
      header: "Image",
      cell: (room) => (
        <RoomImageCell
          image={room.image ? `data:image/png;base64,${room.image}` : undefined}
          alt={room.type}
        />
      ),
    },
    { header: "ID", accessorKey: "id" },
    { header: "Type", accessorKey: "type" },
    { header: "Beds", accessorKey: "beds" },
    { header: "Price", accessorKey: "price" },
    { header: "Area", accessorKey: "area" },
    { header: "Capacity", accessorKey: "capacity" },
    { header: "Space", accessorKey: "total_space" },
  ];

  const headers = [
    "Image",
    "ID",
    "Type",
    "Beds",
    "Price",
    "Area",
    "Capacity",
    "Space",
  ];
  const widths = ["10%", "23%"];
  const actionsWidth = "15%";

  return (
    <div className="p-6 mt-36">
      <Row className="gap-8">
        <div className="w-3/4">
          <DataTable
            data={roomsWithFilters || []}
            columns={columns}
            headers={headers}
            widths={widths}
            isLoading={isLoading}
            isError={isError}
            error={error}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
            actionsWidth={actionsWidth}
          />
        </div>
        <div className="w-1/4">
          <AdminRoomFilter onFilterSubmit={handleFilterSubmit} />
        </div>
      </Row>

      <AdminRoomCreateModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
      />

      <RoomEditModal
        room={editingRoom}
        isOpen={!!editingRoom}
        onClose={closeEditModal}
      />

      <RoomDeleteModal
        room={deletingRoom}
        isOpen={!!deletingRoom}
        onClose={closeDeleteModal}
      />
    </div>
  );
}

export default AdminRooms;
