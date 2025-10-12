import baseApi from "./apiBase.tsx";
import {Booking} from "../Types/Booking.tsx";
import {Guest, GuestCreateIn} from "../Types/Guest.tsx";

export const createGuest = async (guestIn: GuestCreateIn): Promise<Guest> => {
  const { data }: { data: Guest } = await baseApi.post<Booking>(
    `/guest/`,
    guestIn,
  );
  return data;
};
