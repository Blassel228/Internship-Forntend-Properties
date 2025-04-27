import baseApi from "./apiBase.tsx";
import {Booking, BookingCreate, Property} from "../Types/types.tsx";
import {getItem} from "../Utils/localStorage.tsx";

export const createBooking = async (booking: BookingCreate): Promise<Booking> => {
  const token = getItem('token');
  const { data }: { data: Booking } = await baseApi.post<Booking>(`/booking`, booking, {
      headers: { Authorization: `Bearer ${token}` },
    });
  return data;
};
