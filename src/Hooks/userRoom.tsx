import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../Api/apiRoom.tsx";

export const useRoomQuery = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: () => getRooms(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 60000,
  });
};
