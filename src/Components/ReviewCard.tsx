import Row from "./Row.tsx";
import AvatarImage from "./AvatarImage.tsx";
import Column from "./Column.tsx";
import {Booking} from "../Types/Booking.tsx";
import routers from "../Constants/routers.tsx";
import useNavigation from "../Utils/navigate.tsx";

interface ReviewCardProps {
  booking: Booking;
}

const ReviewCard = ({ booking }: ReviewCardProps) => {
  const { created_at, room } = booking;
  const { goTo } = useNavigation();

  const createdAt = new Date(created_at);
  const now = new Date();
  const diffTime = now.getTime() - createdAt.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const daysLeft = Math.max(0, 90 - diffDays);

  const handleReview = () => {
    console.log(room.id);
    goTo(routers.makeReview, { state: { roomId: room.id } });
  };

  return (
    <Row className="shadow bg-white px-4 py-4 gap-8 w-[50rem] items-start">
      <AvatarImage
        src={`data:image/png;base64,${room.image}`}
        imageClassName="w-24 h-20 rounded object-cover"
      />
      <Column className="flex-1">
        <p className="font-bold text-lg">
          You can still review your stay at {room.type}
        </p>
        <p className="text-gray-500">You have only {daysLeft} days left</p>
        <button
          className="bg-orange-500 text-white w-48 cursor-pointer font-bold rounded px-4 py-2 mt-2"
          onClick={handleReview}
        >
          Review your stay
        </button>
      </Column>
    </Row>
  );
};

export default ReviewCard;
