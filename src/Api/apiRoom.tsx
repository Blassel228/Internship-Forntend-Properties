import baseApi from "./apiBase.tsx";

import { Room, RoomCreate, RoomFilters, RoomUpdate } from "../Types/Room.tsx";

export const createRoom = async (
  room: RoomCreate,
  image: File,
): Promise<Room> => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("room", JSON.stringify(room));
  const { data }: { data: Room } = await baseApi.post<Room>(
    "/room/",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
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
  const { data } = await baseApi.get<Room>(`/room/${room_id}`);
  return data;
};

export const getRoomsWithFilter = async (
  filters: RoomFilters,
): Promise<Room[]> => {
  const { data } = await baseApi.get<Room[]>("room/filter", {
    params: filters,
  });
  return data;
};

export const updateRoom = async (
  room_id: string,
  room: RoomUpdate,
): Promise<Room> => {
  const { data } = await baseApi.put<Room>(`room/${room_id}`, { ...room });
  return data;
};

export const deleteRoom = async (room_id: string): Promise<boolean> => {
  const { data } = await baseApi.delete<boolean>(`room/${room_id}`);
  return data;
};
