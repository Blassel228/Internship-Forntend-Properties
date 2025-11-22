import useUpdateBooking from "./useUpdateBooking.tsx";
import { useForm } from "react-hook-form";
import { Booking, UpdateBooking } from "../../Types/Booking.tsx";
import bookingStatus from "../../Enums/bookingStatus.tsx";
import React, { useEffect } from "react";
import GenericEditModal from "../../Components/Ui/GenericEditModal.tsx";

interface BookingEditModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingEditModal = ({
  booking,
  isOpen,
  onClose,
}: BookingEditModalProps) => {
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
