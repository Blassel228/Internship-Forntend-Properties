import React, { Fragment, useEffect, useState } from "react";
import Column from "../Components/Column.tsx";
import Row from "../Components/Row.tsx";
import DataTable from "../Components/Table/DataTable.tsx";
import useAdminBookings from "../Hooks/useAdminBookings.tsx";
import GenericDeleteModal from "../Components/GenericDeleteModal.tsx";
import GenericEditModal from "../Components/GenericEditModal";
import { Booking, UpdateBooking } from "../Types/Booking.tsx";
import bookingStatus from "../Enums/bookingStatus.tsx";
import { format, parseISO } from "date-fns";
import { useForm } from "react-hook-form";
import useRefundByAdmin from "../Hooks/useRefundByAdmin.tsx";
import { CreateRefundRequestByAdmin } from "../Types/Payment.tsx";
import useUpdateBooking from "../Hooks/useUpdateBooking.tsx";
import useDeleteBooking from "../Hooks/useDeleteBooking.tsx";
import { Dialog, Transition } from "@headlessui/react";
import { Loader2, AlertCircle } from "lucide-react";

interface BookingRefundModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookingRefundModal: React.FC<BookingRefundModalProps> = ({
  booking,
  isOpen,
  onClose,
}) => {
  const { createRefundByAdmin, isPending, isError, error, reset } =
    useRefundByAdmin();

  const [refundAmount, setRefundAmount] = useState<string>(
    booking?.price ? booking.price.toString() : ''
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleRefund = async () => {
    if (!booking || !refundAmount) {
      setValidationError('Please enter a refund amount.');
      return;
    }

    const amountNum = parseFloat(refundAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setValidationError('Refund amount must be greater than zero.');
      return;
    }

    if (amountNum > booking.price) {
      setValidationError(
        `Refund amount cannot exceed the booking price of $${booking.price.toFixed(2)}.`
      );
      return;
    }

    setValidationError(null);

    const refundRequest: CreateRefundRequestByAdmin = {
      booking_id: booking.id,
      amount: amountNum,
      refund_reason: 'Admin initiated refund',
    };

    await createRefundByAdmin(refundRequest, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
      setValidationError(null);
      if (booking?.price) {
        setRefundAmount(booking.price.toString());
      }
    }
  }, [isOpen, reset, booking?.price]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl border-2 border-gray-300 relative z-[60]">
                <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                  Refund Booking
                </Dialog.Title>

                {booking && (
                  <div className="py-2 space-y-4">
                    <p className="text-sm text-gray-700">
                      Refund amount for booking{' '}
                      <span className="font-mono text-xs">{booking.id}</span>:
                    </p>

                    <div>
                      <label htmlFor="refundAmount" className="sr-only">
                        Refund amount
                      </label>
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          id="refundAmount"
                          min="0"
                          max={booking.price}
                          step="0.01"
                          value={refundAmount}
                          onChange={(e) => {
                            setRefundAmount(e.target.value);
                            setValidationError(null);
                          }}
                          className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                          placeholder="0.00"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">USD</span>
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Maximum refundable: ${booking.price.toFixed(2)}
                      </p>
                    </div>

                    {validationError && (
                      <div className="flex items-start gap-2 p-3 text-sm text-red-600 bg-red-50 rounded">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{validationError}</span>
                      </div>
                    )}

                    {isError && !validationError && (
                      <div className="flex items-start gap-2 p-3 text-sm text-red-600 bg-red-50 rounded">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>
                          {error?.response?.data?.error?.detail ||
                            'Failed to process refund. Please try again.'}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    disabled={isPending}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleRefund}
                    disabled={isPending || !booking}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-60 flex items-center gap-2"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Refund'
                    )}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
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
      start_date: booking?.start_date
        ? new Date(booking.start_date).toISOString()
        : "",
      end_date: booking?.end_date
        ? new Date(booking.end_date).toISOString()
        : "",
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
        start_date: booking.start_date
          ? new Date(booking.start_date).toISOString()
          : "",
        end_date: booking.end_date
          ? new Date(booking.end_date).toISOString()
          : "",
        status: booking.status || bookingStatus.CONFIRMED,
        special_requests: booking.special_requests || "",
      });
    }
  }, [booking, reset]);

  const handleEditSubmit = (data: UpdateBooking) => {
    if (!booking) return;

    const processedData = {
      ...data,
      start_date: data.start_date
        ? new Date(data.start_date).toISOString()
        : undefined,
      end_date: data.end_date
        ? new Date(data.end_date).toISOString()
        : undefined,
    };

    updateBooking(
      { bookingId: booking.id, updatedData: processedData },
      {
        onSuccess: () => onClose(),
      },
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
  const { bookings, areBookingsLoading, bookingsError, isError } = useAdminBookings();
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
    { header: "Created", cell: (b: Booking) => format(new Date(b.created_at), "MMM dd, yyyy") },
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
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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