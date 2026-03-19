import Row from "../../../Components/Ui/Row.tsx";
import Column from "../../../Components/Ui/Column.tsx";
import { FaStar as FullStar } from "react-icons/fa";
import { FaRegStar as EmptyStar } from "react-icons/fa6";
import { Review } from "../../../Types/Review.tsx";
import useGetUser from "../../AdminUsers/useGetUser.tsx";
import { stringToColor } from "../../../Utils/helpers.tsx";
import AvatarImage from "../../../Components/Ui/AvatarImage.tsx";

const CommentCard = ({ review }: { review: Review }) => {
  const { stars, title, experience_comment, created_at, user_id } = review;
  const { user, isUserLoading, userError } = useGetUser(user_id);

  if (!user || isUserLoading || userError) return null;

  const { username } = user;
  const colorFallback = stringToColor(username);
  const image = user.image
    ? `data:image/png;base64,${user.image.image_data}`
    : undefined;

  const daysAgo = Math.floor(
    (new Date().getTime() - new Date(created_at).getTime()) /
      (1000 * 60 * 60 * 24),
  );
  const timeAgo =
    daysAgo === 0
      ? "Today"
      : daysAgo === 1
        ? "Yesterday"
        : `${daysAgo} days ago`;

  return (
    <Column className="p-5 bg-white rounded-xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
      <Row className="items-center gap-4 pb-3">
        <AvatarImage
          src={image}
          fallbackText={username.charAt(0).toUpperCase()}
          bgColor={colorFallback || "bg-orange-400"}
          rootClassName="w-11 h-11 rounded-full overflow-hidden flex items-center justify-center text-white text-lg"
          imageClassName="w-full h-full object-cover"
          fallbackClassName="w-full h-full flex items-center justify-center rounded-full text-white bg-orange-500"
        />
        <p className="font-bold text-gray-800">{username}</p>
      </Row>

      <Row className="items-center lg:gap-1.5 sm:gap-0.5 my-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="text-orange-400">
            {i < stars ? (
              <FullStar className="text-orange-500" />
            ) : (
              <EmptyStar />
            )}
          </span>
        ))}
        <span className="ml-2 font-semibold text-orange-600">{stars}/10</span>
        <span className="text-sm text-orange-400 ml-3">{timeAgo}</span>
      </Row>

      <Column className="pt-2">
        {title && (
          <h3 className="font-bold text-lg text-gray-800 mb-1">{title}</h3>
        )}
        <p className="text-gray-600 leading-relaxed text-justify">{experience_comment}</p>
      </Column>
    </Column>
  );
};

export default CommentCard;
