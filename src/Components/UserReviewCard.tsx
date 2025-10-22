import useNavigation from "../Utils/navigate.tsx";
import routers from "../Constants/routers.tsx";
import AvatarImage from "./AvatarImage.tsx";
import Column from "./Column.tsx";
import { CheckCircle } from "lucide-react";

interface ReviewCardProps {
  booking: any;
  isReviewable: boolean;
}

const UserReviewCard = ({ booking, isReviewable }: ReviewCardProps) => {
  const { created_at, room, end_date } = booking;
  const { goTo } = useNavigation();

  const createdAt = new Date(created_at);
  const now = new Date();
  const diffDays = Math.ceil(
    (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24),
  );
  const daysLeft = Math.max(0, 90 - diffDays);

  const canReview = isReviewable && daysLeft > 0;

  const handleReview = () => {
    if (canReview) {
      goTo(routers.makeReview, { state: { roomId: room.id } });
    }
  };

  return (
    <Column className="bg-white w-full border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
        <AvatarImage
          src={`data:image/png;base64,${room.image}`}
          imageClassName="w-16 sm:w-20 h-16 sm:h-20 rounded-lg object-cover"
          rootClassName="w-16 sm:w-20 h-16 sm:h-20 rounded-lg overflow-hidden flex-shrink-0"
        />
        <div className="flex-1 min-w-0 w-full">
          <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
            Stay at {room.type}
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            Completed on {new Date(end_date).toLocaleDateString()}
          </p>

          {daysLeft > 0 ? (
            isReviewable ? (
              <p className="text-gray-700 mt-3">
                You can still leave a review — only{" "}
                <span className="font-semibold">
                  {daysLeft} day{daysLeft !== 1 ? "s" : ""}
                </span>{" "}
                left!
              </p>
            ) : (
              <div className="mt-3 flex items-center gap-2">
                <CheckCircle className="text-green-600" size={20} />
                <span className="text-green-700 font-medium">
                  Review submitted
                </span>
              </div>
            )
          ) : (
            <p className="text-gray-500 mt-3 italic">Review period expired.</p>
          )}

          {canReview && (
            <button
              onClick={handleReview}
              className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
            >
              Write a Review
            </button>
          )}

          {isReviewable && daysLeft <= 0 && (
            <button
              disabled
              className="mt-3 px-4 py-2 bg-gray-100 text-gray-500 font-medium rounded-lg cursor-not-allowed"
            >
              Review Expired
            </button>
          )}
        </div>
      </div>
    </Column>
  );
};

export default UserReviewCard;
