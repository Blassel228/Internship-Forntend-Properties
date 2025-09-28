import {useQuery} from "@tanstack/react-query";
import {getRooms, getRoomsWithFilter} from "../Api/apiRoom.tsx";
import {Booking} from "../Types/Booking.tsx";
import {RoomFilters} from "../Types/Room.tsx";

export const useRooms = () => {
  const {data: rooms, isLoading, error} = useQuery<Booking[], Error>({
    queryKey: ["rooms"],
    queryFn: () => getRooms(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 60000,
  });
  return{ rooms, isLoading, error };
};

export const useRoomsWithFilters = (filters: RoomFilters) => {
  const {data: roomsWithFilters, isLoading, error, isError} = useQuery<Booking[], Error>({
    queryKey: ["rooms", "filtered", filters],
    queryFn: () => getRoomsWithFilter(filters),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 60000,
  });
  return{ roomsWithFilters, isLoading, error, isError };
};
