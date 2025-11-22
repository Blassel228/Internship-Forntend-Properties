import { Booking } from "../../Types/Booking.tsx";
import useDeleteBooking from "./useDeleteBooking.tsx";
import GenericDeleteModal from "../../Components/Ui/GenericDeleteModal.tsx";
import React from "react";

interface BookingDeleteModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingDeleteModal = ({
  booking,
  isOpen,
  onClose,
}: BookingDeleteModalProps) => {
  const { deleteBooking, isBookingDeleting, deleteBookingError } =
    useDeleteBooking();

  return (
    <GenericDeleteModal
      item={booking}
      isOpen={isOpen}
      onClose={onClose}
      onDelete={(id) =>
        deleteBooking({ bookingId: id }) as unknown as Promise<boolean>
      }
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
