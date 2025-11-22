import React from "react";
import { motion } from "framer-motion";
import routers from "../../Constants/routers.tsx";
import useSearchParams from "../../Hooks/useSearchParams.tsx";
import { Room } from "../../Types/Room.tsx";
import Row from "../../Components/Ui/Row.tsx";
import { StarIcon } from "lucide-react";
import useNavigation from "../../Utils/navigate.tsx";
import NotRatedTag from "../../Components/Ui/NotRatedTag.tsx";

const RoomCard = ({ room }: { room: Room }) => {
  const { goTo } = useNavigation();
  const { startDate, endDate, capacity } = useSearchParams();

  const handleNavigate = () => {
    goTo(
      {
        pathname: `${routers.room}/${room.id}`,
        search: `?start_date=${startDate}&end_date=${endDate}&capacity=${capacity}`,
      },
      { state: { room } },
    );
  };

  const hasRating =
    room.average_rating !== null && room.average_rating !== undefined;

  return (
    <motion.div
      key={room.id}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      onClick={handleNavigate}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <img
        alt="Room image"
        src={`data:image/png;base64,${room.image}`}
        className="w-full h-48 object-cover sm:h-64"
      />

      <div className="p-3 space-y-1">
        <Row className="items-center gap-1 flex-wrap">
          {hasRating ? (
            <>
              <div className="flex items-center bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                <span className="font-bold text-orange-700 text-sm">
                  {room.average_rating}
                </span>
                <StarIcon
                  className="text-orange-500 fill-orange-500 ml-1"
                  size={12}
                />
              </div>
              <span className="bg-pink-200 text-pink-800 px-2 py-1 rounded-full text-xs font-medium">
                {room.type}
              </span>
            </>
          ) : (
            <>
              <NotRatedTag />
              <span className="bg-pink-200 text-pink-800 px-2 py-1 rounded-full text-xs font-medium">
                {room.type}
              </span>
            </>
          )}
        </Row>

        <h2 className="text-lg font-bold text-orange-600">
          ${room.price.toFixed(2)}
        </h2>

        <p className="text-base font-medium line-clamp-1">{room.area}</p>

        <div className="flex flex-wrap gap-1 text-gray-600 text-xs">
          <span>
            Capacity: <strong>{room.capacity}</strong>
          </span>
          <span>
            Bathes: <strong>{room.bathes}</strong>
          </span>
          <span>
            Area: <strong>{room.area}</strong>
          </span>
          <span>
            Floor: <strong>{room.floor}</strong>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default RoomCard;
