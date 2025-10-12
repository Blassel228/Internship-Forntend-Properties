import baseApi from "./apiBase.tsx";
import {Booking} from "../Types/Booking.tsx";
import {Room} from "../Types/Room.tsx";

export const getBookingsForOneUser = async (): Promise<Booking[]> => {
  const { data }: { data: Booking[] } = await baseApi.get("/booking/my");
  console.log(data);
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
