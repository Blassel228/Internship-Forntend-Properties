import React, { useState } from "react";
import Column from "../Components/Column.tsx";
import Row from "../Components/Row.tsx";
import DataTable from "../Components/Table/DataTable.tsx";
import useBookings from "../Hooks/useBookings.tsx";
import GenericDeleteModal from "../Components/GenericDeleteModal.tsx";
import GenericEditModal from "../Components/GenericEditModal";
import { Booking } from "../Types/Booking.tsx";
import bookingStatus from "../Enums/bookingStatus.tsx";
import { format } from "date-fns";
import { useForm } from "react-hook-form";

interface BookingEditModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookingEditModal = ({ booking, isOpen, onClose }: BookingEditModalProps) => {
  const { setValue, reset } = useForm({
    defaultValues: {
      user_id: booking?.user_id || "",
      guest_id: booking?.guest_id || "",
      room_id: booking?.room_id || "",
      price: booking?.price || 0,
      start_date: booking?.start_date ? format(new Date(booking.start_date), "yyyy-MM-dd'T'HH:mm") : "",
      end_date: booking?.end_date ? format(new Date(booking.end_date), "yyyy-MM-dd'T'HH:mm") : "",
      status: booking?.status || bookingStatus.CONFIRMED,
      special_requests: booking?.special_requests || "",
    },
  });

  React.useEffect(() => {
    if (booking) {
      reset({
        user_id: booking.user_id || "",
        guest_id: booking.guest_id || "",
        room_id: booking.room_id || "",
        price: booking.price || 0,
        start_date: booking.start_date ? format(new Date(booking.start_date), "yyyy-MM-dd'T'HH:mm") : "",
        end_date: booking.end_date ? format(new Date(booking.end_date), "yyyy-MM-dd'T'HH:mm") : "",
        status: booking.status || bookingStatus.CONFIRMED,
        special_requests: booking?.special_requests || "",
      });
    }
  }, [booking, reset]);

  const handleEditSubmit = (data: any) => {
    console.log("Editing booking:", data);
    onClose();
  };

  const editFields = [
    {
      name: "user_id",
      label: "User ID",
      type: "text",
      required: false,
    },
    {
      name: "guest_id",
      label: "Guest ID",
      type: "text",
      required: false,
    },
    {
      name: "room_id",
      label: "Room ID",
      type: "text",
      required: true,
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      required: true,
    },
    {
      name: "start_date",
      label: "Start Date",
      type: "datetime-local",
      required: true,
    },
    {
      name: "end_date",
      label: "End Date",
      type: "datetime-local",
      required: true,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: Object.values(bookingStatus),
      required: true,
    },
    {
      name: "special_requests",
      label: "Special Requests",
      type: "textarea",
      required: false,
    },
  ];

  return (
    <GenericEditModal
      item={booking}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleEditSubmit}
      isUpdating={false}
      title={(booking) => `Edit Booking: ${booking?.id}`}
      fields={editFields}
      setValue={setValue}
    />
  );
};

interface BookingDeleteModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookingDeleteModal = ({ booking, isOpen, onClose }: BookingDeleteModalProps) => {
  const handleDelete = () => {
    console.log("Deleting booking:", booking?.id);
    onClose();
  };

  return (
    <GenericDeleteModal
      item={booking}
      isOpen={isOpen}
      onClose={onClose}
      onDelete={handleDelete}
      isDeleting={false}
      deletionError={null}
      deletionSuccess={false}
      title={(booking) => `Delete Booking: ${booking?.id}`}
      itemName={(booking) => `Booking ${booking?.id}`}
      confirmationMessage="Are you sure you want to delete this booking from the database?"
      showImage={false}
    />
  );
};

const AdminBookings = () => {
  const { bookings, areBookingsLoading, bookingsError, isError } = useBookings();
  const [currentPage, setCurrentPage] = useState(1);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [deletingBooking, setDeletingBooking] = useState<Booking | null>(null);
  const itemsPerPage = 10;

  const totalPages = bookings ? Math.ceil(bookings.length / itemsPerPage) : 0;
  const paginatedBookings = bookings
    ? bookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  const openEditModal = (booking: Booking) => setEditingBooking(booking);
  const closeEditModal = () => setEditingBooking(null);

  const openDeleteModal = (booking: Booking) => setDeletingBooking(booking);
  const closeDeleteModal = () => setDeletingBooking(null);

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Customer",
      cell: (booking: Booking) =>
        booking.user?.name ||
        booking.guest?.name ||
        booking.user_id ||
        booking.guest_id ||
        "Unknown"
    },
    {
      header: "Room",
      cell: (booking: Booking) =>
        booking.room?.name ||
        booking.room_id ||
        "Unknown"
    },
    {
      header: "Price",
      cell: (booking: Booking) => `$${booking.price.toFixed(2)}`
    },
    {
      header: "Dates",
      cell: (booking: Booking) => (
        <div>
          <div>{format(new Date(booking.start_date), "MMM dd, yyyy")}</div>
          <div>{format(new Date(booking.end_date), "MMM dd, yyyy")}</div>
        </div>
      )
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "Created",
      cell: (booking: Booking) => format(new Date(booking.created_at), "MMM dd, yyyy")
    }
  ];

  const headers = columns.map((col) => col.header);
  const widths = ["8%", "12%", "12%", "8%", "15%", "10%", "15%"];
  const actionsWidth = "10%";

  return (
    <>
      <Row className="mt-36 justify-center px-16 w-full">
        <Column className="gap-4">
          <DataTable
            data={paginatedBookings}
            columns={columns}
            headers={headers}
            widths={widths}
            actionsWidth={actionsWidth}
            isLoading={areBookingsLoading}
            isError={isError}
            error={bookingsError}
            emptyMessage="No bookings found"
            onEdit={openEditModal}
            onDelete={openDeleteModal}
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
    </>
  );
};

export default AdminBookings;
