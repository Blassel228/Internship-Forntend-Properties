import React from "react";
import { StarIcon } from "lucide-react";

interface RatingWithStar {
  rating: number;
}

const RatingWithStar: React.FC<RatingWithStar> = ({ rating }) => {
  return (
    <div className="flex items-center bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
      <span className="font-bold text-orange-700 text-sm">
        {rating.toFixed(1)}
      </span>
      <StarIcon className="text-orange-500 fill-orange-500 ml-1" size={12} />
    </div>
  );
};

export default RatingWithStar;