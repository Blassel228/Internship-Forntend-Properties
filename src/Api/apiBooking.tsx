import baseApi from "./apiBase.tsx";
import {Booking} from "../Types/Booking.tsx";

export const getBookingsForOneUser = async (): Promise<Booking[]> => {
  const { data } : { data: Booking[] }  = await baseApi.get('/booking/get_bookings_for_one_user');
  console.log(data);
  return data;
}

export const getBooking = async (booking_id: string): Promise<Booking> => {
  const { data } : { data: Booking }  = await baseApi.get(`/booking/get_one/${booking_id}`);
  return data;
}