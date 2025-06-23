import baseApi from "./apiBase.tsx";
import {Booking, Guest, GuestCreate} from "../Types/types.tsx";

export const createGuest = async (guest: GuestCreate): Promise<Guest> => {
  const { data }: { data: Guest } = await baseApi.post<Booking>(`/guest`, guest);
  return data;
};
