import React, { Fragment, useState } from "react";
import Column from "../Components/Column.tsx";
import Row from "../Components/Row.tsx";
import DataTable from "../Components/Table/DataTable.tsx";
import useAdminBookings from "../Feature/AdminBooking/useAdminBookings.tsx";
import { Booking } from "../Types/Booking.tsx";
import bookingStatus from "../Enums/bookingStatus.tsx";
import { format, parseISO } from "date-fns";
import { BookingRefundModal } from "../Feature/AdminBooking/BookingRefundModal.tsx";
import { BookingEditModal } from "../Feature/AdminBooking/BookingEditModal.tsx";
import { BookingDeleteModal } from "../Feature/AdminBooking/BookingDeleteModal.tsx";

const AdminBookings = () => {
  const { bookings, areBookingsLoading, bookingsError, isError } =
    useAdminBookings();
  const [currentPage, setCurrentPage] = useState(1);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [deletingBooking, setDeletingBooking] = useState<Booking | null>(null);
  const [refundingBooking, setRefundingBooking] = useState<Booking | null>(
    null,
  );
  const itemsPerPage = 10;

  const totalPages = bookings ? Math.ceil(bookings.length / itemsPerPage) : 0;
  const paginatedBookings = bookings
    ? bookings.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      )
    : [];

  const openEditModal = (booking: Booking) => setEditingBooking(booking);
  const closeEditModal = () => setEditingBooking(null);

  const openDeleteModal = (booking: Booking) => setDeletingBooking(booking);
  const closeDeleteModal = () => setDeletingBooking(null);

  const openRefundModal = (booking: Booking) => setRefundingBooking(booking);
  const closeRefundModal = () => setRefundingBooking(null);

  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "Guest ID", cell: (b: Booking) => b.guest_id || "None" },
    { header: "User ID", cell: (b: Booking) => b.user_id || "None" },
    { header: "Room ID", cell: (b: Booking) => b.room_id || "Unknown" },
    { header: "Price", cell: (b: Booking) => `$${b.price.toFixed(2)}` },
    {
      header: "Dates",
      cell: (b: Booking) => (
        <div>
          <div>{format(parseISO(b.start_date), "MMM dd, yyyy")}</div>
          <div>{format(parseISO(b.end_date), "MMM dd, yyyy")}</div>
        </div>
      ),
    },
    { header: "Status", accessorKey: "status" },
    {
      header: "Created",
      cell: (b: Booking) => format(new Date(b.created_at), "MMM dd, yyyy"),
    },
  ];

  const headers = columns.map((col) => col.header);
  const actionsWidth = "15%";

  const renderBookingActions = (booking: Booking) => (
    <div className="flex gap-2">
      <button
        onClick={() => openEditModal(booking)}
        className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded transition-colors"
      >
        Edit
      </button>
      <button
        onClick={() => openDeleteModal(booking)}
        className="flex-1 py-2 bg-red-600 hover:bg-red-800 text-white text-sm font-medium rounded transition-colors"
      >
        Delete
      </button>
      <button
        onClick={() => openRefundModal(booking)}
        className={`flex-1 py-2 text-sm font-medium rounded transition-colors
        ${
          booking?.status === bookingStatus.CONFIRMED
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300"
        }`}
        disabled={booking.status !== bookingStatus.CONFIRMED}
      >
        Refund
      </button>
    </div>
  );

  return (
    <>
      <Row className="mt-36 justify-center px-16 w-full">
        <Column className="gap-4">
          <DataTable
            data={paginatedBookings}
            columns={columns}
            headers={headers}
            actionsWidth={actionsWidth}
            isLoading={areBookingsLoading}
            isError={isError}
            error={bookingsError}
            emptyMessage="No bookings found"
            renderActions={renderBookingActions}
          />

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-orange-500 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-orange-500 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </Column>
      </Row>

      <BookingEditModal
        key={editingBooking?.id || "new"}
        booking={editingBooking}
        isOpen={!!editingBooking}
        onClose={closeEditModal}
      />

      <BookingDeleteModal
        booking={deletingBooking}
        isOpen={!!deletingBooking}
        onClose={closeDeleteModal}
      />

      <BookingRefundModal
        booking={refundingBooking}
        isOpen={!!refundingBooking}
        onClose={closeRefundModal}
      />
    </>
  );
};

export default AdminBookings;
