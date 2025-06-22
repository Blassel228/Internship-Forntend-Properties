import baseApi from "./apiBase.tsx";
import {Booking, BookingCreate, GuestCreate} from "../Types/types.tsx";
import {getItem} from "../Utils/localStorage.tsx";

export const createBooking = async (booking: BookingCreate, guest: GuestCreate): Promise<Booking> => {
  const { data }: { data: Booking } = await baseApi.post<Booking>(`/booking`, { booking, guest });
  return data;
};
