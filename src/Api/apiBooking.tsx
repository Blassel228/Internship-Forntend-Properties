import baseApi from "./apiBase.tsx";
import { Booking, BookingCreateIn } from "../Types/Booking.tsx";
import { GuestCreateIn } from "../Types/Guest.tsx";

export const createBookingWithToken = async (
  bookingIn: BookingCreateIn,
  guestIn: GuestCreateIn,
): Promise<Booking> => {
  const { data }: { data: Booking } = await baseApi.post<Booking>(
    `/booking/create_booking_with_token`,
    { booking_in: bookingIn, guest_in: guestIn },
  );

  return data;
};

export const createBookingWithoutToken = async (
  bookingIn: BookingCreateIn,
  guestIn: GuestCreateIn,
): Promise<Booking> => {
  const { data }: { data: Booking } = await baseApi.post<Booking>(
    `/booking/create_booking_without_token`,
    { booking_in: bookingIn, guest_in: guestIn },
  );

  return data;
};
