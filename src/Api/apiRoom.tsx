import baseApi from "./apiBase.tsx";

import {Room, RoomFilters, RoomUpdate} from "../Types/Room.tsx";

export const getRooms = async (
  offset?: number,
  limit?: number,
): Promise<Room[]> => {
  const { data }: { data: Room[] } = await baseApi.get<Room[]>("/room", {
    params: { offset, limit },
  });
  return data;
};

export const getSearchRooms = async (
  start_date: string,
  end_date: string,
  capacity: number,
): Promise<Room[]> => {
  const { data }: { data: Room[] } = await baseApi.get<Room[]>(
    `/room/search/${start_date}/${end_date}/${capacity}`,
  );
  return data;
};

export const getRoom = async (room_id: string): Promise<Room> => {
  const { data } = await baseApi.get<Room>(`/room/get_one/${room_id}`);
  return data;
};

export const getRoomsWithFilter = async (filters: RoomFilters): Promise<Room[]> => {
  const { data } = await baseApi.get<Room[]>("room/get_with_filters", {
    params: filters,
  });
  return data;
};


export const updateRoom = async (room_id: string, room: RoomUpdate): Promise<Room> => {
  const { data } = await baseApi.put<Room>(`room/${room_id}`, { ...room });
  return data;
};