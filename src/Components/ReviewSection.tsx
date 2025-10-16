import { useState } from "react";
import  RatingFilters from "../Enums/ratingFilters";
import { useGetReviewsForRoom } from "../Hooks/useGetReviewsForRoom";
import { Room } from "../Types/Room";
import {Review} from "../Types/Review.tsx";
import Row from "./Row.tsx";
import CommentCard from "./CommentCard.tsx";

const ReviewSection = ({ room }: { room: Room }) => {
  const [sort, setSort] = useState<RatingFilters>(RatingFilters.BEST);
  const {
    reviews,
    isLoading,
    error,
    loadMore,
    hasMore,
    isFetchingNextPage,
  } : { reviews: Review[] } = useGetReviewsForRoom(room.id, sort);

  return (
    <section className="py-8">
      <Row className="flex-wrap justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Guest Reviews</h2>

        <Row className="flex-wrap gap-4">
          {Object.values(RatingFilters).map((filter) => (
            <button
              key={filter}
              onClick={() => setSort(filter)}
              className={`px-3 py-1.5 w-16 text-sm font-medium rounded-full transition-colors ${
                sort === filter
                  ? "bg-orange-500 text-white"
                  : "bg-orange-100 text-orange-700 hover:bg-orange-200"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </Row>
      </Row>

      {error && (
        <div className="text-red-500 py-4">Failed to load reviews.</div>
      )}

      {isLoading && reviews.length === 0 && (
        <div className="py-4">Loading reviews...</div>
      )}

      {reviews.length === 0 && !isLoading && !error && (
        <p className="text-gray-500">No reviews yet.</p>
      )}

      <div className="space-y-6">
        {reviews.map((review) => (
          <CommentCard key={review.id} review={review} />
        ))}
      </div>

      {hasMore && (
        <Row className="mt-8">
          <button
            onClick={() => loadMore()}
            disabled={isFetchingNextPage}
            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg shadow-sm transition disabled:opacity-70"
          >
            {isFetchingNextPage ? "Loading..." : "Load More Reviews"}
          </button>
        </Row>
      )}
    </section>
  );
};

export default ReviewSection;