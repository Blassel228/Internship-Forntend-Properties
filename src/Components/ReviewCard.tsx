import useNavigation from "../Utils/navigate.tsx";
import routers from "../Constants/routers.tsx";
import { User, CheckCircle } from "lucide-react";

const ReviewCard = ({ booking, isReviewed }: { booking: any; isReviewed: boolean }) => {
  const { room, end_date, created_at } = booking;
  const { goTo } = useNavigation();

  const now = new Date();
  const createdAt = new Date(created_at);
  const diffDays = Math.ceil((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
  const daysLeft = Math.max(0, 90 - diffDays);

  const handleReview = () => {
    goTo(routers.makeReview, { state: { roomId: room.id } });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow transition-shadow">
      <div className="flex gap-4">
        {room.image ? (
          <img
            src={`data:image/png;base64,${room.image}`}
            alt={room.type}
            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center">
            <User className="text-gray-400 w-8 h-8" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 text-lg truncate">{room.type}</h3>
          <p className="text-gray-600 text-sm mt-1">
            Stay ended: {new Date(end_date).toLocaleDateString()}
          </p>

          {isReviewed ? (
            <div className="mt-3 inline-flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              <CheckCircle className="w-4 h-4 mr-2" />
              Reviewed
            </div>
          ) : daysLeft > 0 ? (
            <>
              <p className="text-gray-700 mt-3">
                You can still review this stay — only{" "}
                <span className="font-semibold">{daysLeft} day{daysLeft !== 1 ? "s" : ""}</span> left!
              </p>
              <button
                onClick={handleReview}
                className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition text-sm"
              >
                Write Review
              </button>
            </>
          ) : (
            <p className="text-gray-500 mt-3 italic">Review period has expired.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
