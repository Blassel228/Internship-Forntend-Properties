import { useQuery } from "@tanstack/react-query";
import { getSearchRooms } from "../Api/apiRoom.tsx";

const useSearchRoomsQuery = (start_date: string, end_date: string, capacity: number) => {
  return useQuery({
    queryKey: ["searchRooms"],
    queryFn: () => getSearchRooms(start_date, end_date, capacity),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 600000,
  });
};

export default useSearchRoomsQuery;