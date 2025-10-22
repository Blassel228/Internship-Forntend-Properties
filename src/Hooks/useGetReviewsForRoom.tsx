import { getReviewsForRoom } from "../Api/apiReview.tsx";
import { useInfiniteQuery } from "@tanstack/react-query";
import RatingFilters from "../Enums/ratingFilters.tsx";

const REVIEWS_PER_PAGE = 3;

export const useGetReviewsForRoom = (roomId: string, sort: RatingFilters) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["reviews", roomId, sort],
    queryFn: async ({ pageParam = 0 }) => {
      const result = await getReviewsForRoom(
        roomId,
        pageParam * REVIEWS_PER_PAGE,
        REVIEWS_PER_PAGE + 1,
        sort,
      );

      const hasMore = result.length > REVIEWS_PER_PAGE;
      return {
        items: result.slice(0, REVIEWS_PER_PAGE),
        hasMore,
      };
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length : undefined,
    initialPageParam: 0,
  });

  const reviews = data?.pages.flatMap((page) => page.items) || [];

  return {
    reviews,
    isLoading,
    error,
    loadMore: fetchNextPage,
    hasMore: hasNextPage,
    isFetchingNextPage,
  };
};
