import useNavigation from "../../Utils/navigate.tsx";
import routers from "../../Constants/routers.tsx";
import AvatarImage from "../../Components/Ui/AvatarImage.tsx";
import Column from "../../Components/Ui/Column.tsx";
import Row from "../../Components/Ui/Row.tsx";
import { CheckCircle } from "lucide-react";
import AppButton from "../../Components/Ui/AppButton.tsx";

interface ReviewCardProps {
  booking: any;
  isReviewable: boolean;
}

const UserReviewCardMobile = ({ booking, isReviewable }: ReviewCardProps) => {
  const { room, end_date } = booking;
  const { goTo } = useNavigation();

  const createdAt = new Date(booking.created_at);
  const now = new Date();
  const diffDays = Math.ceil((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
  const daysLeft = Math.max(0, 90 - diffDays);
  const canReview = isReviewable && daysLeft > 0;

  const handleReview = () => {
    if (canReview) {
      goTo(routers.makeReview, { state: { roomId: room.id } });
    }
  };

  return (
    <Column className="gap-3">
      <Row className="gap-4">
        <AvatarImage
          src={`data:image/png;base64,${room.image}`}
          imageClassName="w-full h-full object-cover"
          rootClassName="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0"
        />
        <Column className="gap-2 flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-base">Stay at {room.type}</h3>
          <p className="text-gray-600 text-sm">Completed on {new Date(end_date).toLocaleDateString()}</p>
          {canReview ? (
            <AppButton onClick={handleReview} className="w-full max-w-none">
              Write a Review
            </AppButton>
          ) : isReviewable && daysLeft <= 0 ? (
            <button
              disabled
              className="w-full px-4 py-2 bg-gray-100 text-gray-500 font-medium rounded-lg cursor-not-allowed"
            >
              Review Expired
            </button>
          ) : null}
        </Column>
      </Row>
      <Column>
        {daysLeft > 0 ? (
          isReviewable ? (
            <p className="text-gray-700">
              You can still leave a review — only{" "}
              <span className="font-semibold">
                {daysLeft} day{daysLeft !== 1 ? "s" : ""}
              </span>{" "}
              left!
            </p>
          ) : (
            <Row className="items-center gap-2">
              <CheckCircle className="text-green-600" size={20} />
              <span className="text-green-700 font-medium">Review submitted</span>
            </Row>
          )
        ) : (
          <p className="text-gray-500 italic">Review period expired.</p>
        )}
      </Column>
    </Column>
  );
};

const UserReviewCardDesktop = ({ booking, isReviewable }: ReviewCardProps) => {
  const { room, end_date } = booking;
  const { goTo } = useNavigation();

  const createdAt = new Date(booking.created_at);
  const now = new Date();
  const diffDays = Math.ceil((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
  const daysLeft = Math.max(0, 90 - diffDays);
  const canReview = isReviewable && daysLeft > 0;

  const handleReview = () => {
    if (canReview) {
      goTo(routers.makeReview, { state: { roomId: room.id } });
    }
  };

  return (
    <Row className="gap-5 items-start">
      <AvatarImage
        src={`data:image/png;base64,${room.image}`}
        imageClassName="w-full h-full object-cover"
        rootClassName="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0"
      />
      <Column className="flex-1 min-w-0 w-full gap-3">
        <Row className="items-center justify-between flex-wrap gap-y-2">
          <Column className="gap-1">
            <h3 className="font-semibold text-gray-900 text-lg">Stay at {room.type}</h3>
            <p className="text-gray-600 text-sm">Completed on {new Date(end_date).toLocaleDateString()}</p>
          </Column>
          {canReview && <AppButton onClick={handleReview}>Write a Review</AppButton>}
          {isReviewable && daysLeft <= 0 && (
            <button
              disabled
              className="px-4 py-2 bg-gray-100 text-gray-500 font-medium rounded-lg cursor-not-allowed whitespace-nowrap"
            >
              Review Expired
            </button>
          )}
        </Row>
        {daysLeft > 0 ? (
          isReviewable ? (
            <p className="text-gray-700">
              You can still leave a review — only{" "}
              <span className="font-semibold">
                {daysLeft} day{daysLeft !== 1 ? "s" : ""}
              </span>{" "}
              left!
            </p>
          ) : (
            <Row className="items-center gap-2">
              <CheckCircle className="text-green-600" size={20} />
              <span className="text-green-700 font-medium">Review submitted</span>
            </Row>
          )
        ) : (
          <p className="text-gray-500 italic">Review period expired.</p>
        )}
      </Column>
    </Row>
  );
};

const UserReviewCard = ({ booking, isReviewable }: ReviewCardProps) => {
  return (
    <Column className="bg-white w-full border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="block sm:hidden">
        <UserReviewCardMobile booking={booking} isReviewable={isReviewable} />
      </div>
      <div className="hidden sm:block">
        <UserReviewCardDesktop booking={booking} isReviewable={isReviewable} />
      </div>
    </Column>
  );
};

export default UserReviewCard;