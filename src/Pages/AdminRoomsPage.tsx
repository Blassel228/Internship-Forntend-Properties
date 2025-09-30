import { useState, useEffect } from "react";
import { useRoomsWithFilters } from "../Hooks/useRooms.tsx";
import FullHeader from "../Components/Header/FullHeader.tsx";
import Column from "../Components/Column.tsx";
import AdminRoomTable from "../Components/AdminRoomTable.tsx";
import AdminRoomsPagePaginator from "../Components/AdminRoomsPagePaginator.tsx";
import AdminRoomFilter from "../Components/AdminRoomFilter.tsx";
import { RoomFilters } from "../types/Room.tsx";
import Row from "../Components/Row.tsx";

const AdminRoomsPage = () => {
  const [filters, setFilters] = useState<RoomFilters | null>(null);
  const { roomsWithFilters: rooms, isLoading, error, isError} = useRoomsWithFilters(filters);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const totalPages = rooms ? Math.ceil(rooms.length / itemsPerPage) : 0;
  const paginatedRooms = rooms
    ? rooms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  const handleFilterSubmit = (newFilters: RoomFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <FullHeader />
      <Row className="mt-36 justify-center px-16 w-full gap-8">
        <Column className="gap-4">
          <AdminRoomTable rooms={paginatedRooms} isLoading={isLoading} error={error} />
          <AdminRoomsPagePaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Column>
       <AdminRoomFilter onFilterSubmit={handleFilterSubmit} />
      </Row>
    </>
  );
};

export default AdminRoomsPage;