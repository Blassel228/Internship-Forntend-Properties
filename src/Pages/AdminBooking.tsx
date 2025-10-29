import React, { useEffect, useState } from "react";
import Column from "../Components/Column.tsx";
import Row from "../Components/Row.tsx";
import DataTable from "../Components/Table/DataTable.tsx";
import useBookings from "../Hooks/useBookings.tsx";
import GenericDeleteModal from "../Components/GenericDeleteModal.tsx";
import GenericEditModal from "../Components/GenericEditModal";
import { Booking, UpdateBooking } from "../Types/Booking.tsx";
import bookingStatus from "../Enums/bookingStatus.tsx";
import {format, parseISO} from "date-fns";
import { useForm } from "react-hook-form";
import useRefundByAdmin from "../Hooks/useRefundByAdmin.tsx";
import { CreateRefundRequestByAdmin } from "../Types/Payment.tsx";
import useUpdateBooking from "../Hooks/useUpdateBooking.tsx";
import useDeleteBooking from "../Hooks/useDeleteBooking.tsx";

interface BookingRefundModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookingRefundModal = ({ booking, isOpen, onClose }: BookingRefundModalProps) => {
  const { createRefundByAdmin, isPending, isError, error } = useRefundByAdmin();

  const handleRefund = () => {
    if (!booking) return;

    const refundRequest: CreateRefundRequestByAdmin = {
      booking_id: booking.id,
      amount: booking.price,
      reason: "Admin initiated refund"
    };

    createRefundByAdmin(refundRequest, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  return (
    <GenericDeleteModal
      item={booking}
      isOpen={isOpen}
      onClose={onClose}
      onDelete={handleRefund}
      isDeleting={isPending}
      deletionError={isError ? error : null}
      deletionSuccess={false}
      title={(booking) => `Refund Booking: ${booking?.id}`}
      itemName={(booking) => `Booking ${booking?.id}`}
      confirmationMessage={`Are you sure you want to refund $${booking?.price.toFixed(2)} for this booking?`}
      showImage={false}
      actionButtonLabel="Refund"
      actionButtonClass="bg-green-600 hover:bg-green-700"
    />
  );
};

interface BookingEditModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookingEditModal = ({ booking, isOpen, onClose }: BookingEditModalProps) => {
  const { updateBooking, isBookingUpdating } = useUpdateBooking();
  const { setValue, reset } = useForm<UpdateBooking>({
    defaultValues: {
      user_id: booking?.user_id || "",
      guest_id: booking?.guest_id || "",
      room_id: booking?.room_id || "",
      price: booking?.price || 0,
      start_date: booking?.start_date ? new Date(booking.start_date).toISOString() : "",
      end_date: booking?.end_date ? new Date(booking.end_date).toISOString() : "",
      status: booking?.status || bookingStatus.CONFIRMED,
      special_requests: booking?.special_requests || "",
    },
  });

  useEffect(() => {
    if (booking) {
      reset({
        user_id: booking.user_id || "",
        guest_id: booking.guest_id || "",
        room_id: booking.room_id || "",
        price: booking.price || 0,
        start_date: booking.start_date ? new Date(booking.start_date).toISOString() : "",
        end_date: booking.end_date ? new Date(booking.end_date).toISOString() : "",
        status: booking.status || bookingStatus.CONFIRMED,
        special_requests: booking.special_requests || "",
      });
    }
  }, [booking, reset]);

  const handleEditSubmit = (data: UpdateBooking) => {
    if (!booking) return;

    const processedData = {
      ...data,
      start_date: data.start_date ? new Date(data.start_date).toISOString() : undefined,
      end_date: data.end_date ? new Date(data.end_date).toISOString() : undefined,
    };

    updateBooking(
      { bookingId: booking.id, updatedData: processedData },
      {
        onSuccess: () => onClose(),
      }
    );
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
      isUpdating={isBookingUpdating}
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
  const { deleteBooking, isBookingDeleting, deleteBookingError } = useDeleteBooking();

  return (
    <GenericDeleteModal
      item={booking}
      isOpen={isOpen}
      onClose={onClose}
      onDelete={(id) => deleteBooking({ bookingId: id }) as unknown as Promise<boolean>}
      isDeleting={isBookingDeleting}
      deletionError={deleteBookingError}
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
  const [refundingBooking, setRefundingBooking] = useState<Booking | null>(null);
  const itemsPerPage = 10;

  const totalPages = bookings ? Math.ceil(bookings.length / itemsPerPage) : 0;
  const paginatedBookings = bookings
    ? bookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  const openEditModal = (booking: Booking) => setEditingBooking(booking);
  const closeEditModal = () => setEditingBooking(null);

  const openDeleteModal = (booking: Booking) => setDeletingBooking(booking);
  const closeDeleteModal = () => setDeletingBooking(null);

  const openRefundModal = (booking: Booking) => setRefundingBooking(booking);
  const closeRefundModal = () => setRefundingBooking(null);

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Guest ID",
      cell: (booking: Booking) =>
        booking.guest_id ||
        "None"
    },
    {
      header: "User ID",
      cell: (booking: Booking) =>
        booking.user_id ||
        "None"
    },
    {
      header: "Room ID",
      cell: (booking: Booking) =>
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
          <div>{format(parseISO(booking.start_date), "MMM dd, yyyy")}</div>
          <div>{format(parseISO(booking.end_date), "MMM dd, yyyy")}</div>
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
        className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded transition-colors"
        disabled={booking.status !== "CONFIRMED"}
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
