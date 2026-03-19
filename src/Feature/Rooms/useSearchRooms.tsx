import { useQuery } from "@tanstack/react-query";
import { getSearchRooms } from "../../Api/apiRoom.tsx";

const useSearchRooms = (
  start_date: string,
  end_date: string,
  capacity: number,
) => {
  return useQuery({
    queryKey: ["searchRooms"],
    queryFn: () => getSearchRooms(start_date, end_date, capacity),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 600000,
  });
};

export default useSearchRooms;
