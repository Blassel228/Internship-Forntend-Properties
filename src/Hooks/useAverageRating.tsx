import { useQuery } from "@tanstack/react-query";
import { getAverageRating } from "../Api/apiReview.tsx";
import {AverageRating} from "../Types/AverageRating.tsx";

interface ReviewAverageGet {
  average_rating: number | null;
}

const useAverageRating = (room_id: string) => {
  const {
    data: averageRatingData,
    isLoading: isAverageRatingLoading,
    error,
    isError,
  }:{data: AverageRating} = useQuery<ReviewAverageGet, Error>({
    queryKey: ["averageRating", room_id],
    queryFn: () => getAverageRating(room_id),
    enabled: !!room_id,
    staleTime: 5 * 60 * 1000,
  });

  const averageRating = averageRatingData?.average_rating ?? null;

  return { averageRating, isAverageRatingLoading, error, isError };
};

export default useAverageRating;