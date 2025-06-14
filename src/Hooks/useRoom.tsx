import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../Api/apiRoom.tsx";

const useRooms = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: () => getRooms(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 60000,
  });
};

export default useRooms;