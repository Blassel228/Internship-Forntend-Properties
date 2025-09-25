import {useQuery} from "@tanstack/react-query";
import {getRoom} from "../Api/apiRoom.tsx";

const useRoom = (room_id: string) => {
  const { data: room, isLoading, error } = useQuery({
    queryKey: ["room", room_id],
    queryFn: () => {
      return getRoom(room_id);
    },
    enabled: !!room_id,
    staleTime: 5 * 60 * 1000,
  });

  return { room, isLoading, error };
};

export default useRoom;