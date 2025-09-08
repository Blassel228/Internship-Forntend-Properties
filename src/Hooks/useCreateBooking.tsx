import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBookingWithoutToken,
  createBookingWithToken,
} from "../Api/apiBooking.tsx";
import { BookingCreateIn } from "../Types/Booking.tsx";
import { GuestCreateIn } from "../Types/Guest.tsx";

export function useCreateBookingWithToken() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      bookingIn,
      guestIn,
    }: {
      bookingIn: BookingCreateIn;
      guestIn: GuestCreateIn;
    }) => createBookingWithToken(bookingIn, guestIn),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userBookings"] });
    },
  });
}

export function useCreateBookingWithoutToken() {
  return useMutation({
    mutationFn: ({
      bookingIn,
      guestIn,
    }: {
      bookingIn: BookingCreateIn;
      guestIn: GuestCreateIn;
    }) => createBookingWithoutToken(bookingIn, guestIn),
  });
}
