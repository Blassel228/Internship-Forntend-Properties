import baseApi from "./apiBase.tsx";
import { Booking, UpdateBooking } from "../Types/Booking.tsx";
import { Room } from "../Types/Room.tsx";

export const getBookingsForOneUser = async (): Promise<Booking[]> => {
  const { data }: { data: Booking[] } = await baseApi.get("/booking/my");
  return data;
};

export const getBooking = async (booking_id: string): Promise<Booking> => {
  const { data }: { data: Booking } = await baseApi.get(
    `/booking/${booking_id}`,
  );
  return data;
};

export const getBookingsNotRatedByUser = async (): Promise<Room[]> => {
  const { data } = await baseApi.get<Booking[]>("/booking/unrated");
  return data;
};

export const getBookings = async (): Promise<Booking[]> => {
  const { data } = await baseApi.get<Booking[]>("/booking/");
  return data;
};

export const updateBooking = async (
  booking_id: string,
  booking: UpdateBooking,
): Promise<Booking> => {
  const { data } = await baseApi.put(`/booking/${booking_id}`, booking);
  return data;
};

export const deleteBooking = async (booking_id: string): Promise<boolean> => {
  const { data } = await baseApi.delete(`/booking/${booking_id}`);
  return data;
};
