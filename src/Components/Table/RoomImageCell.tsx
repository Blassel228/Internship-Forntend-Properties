import React from "react";

interface RoomImageCellProps {
  image?: string;
  alt?: string;
}

function RoomImageCell({ image, alt }: RoomImageCellProps) {
  return (
    <div className="w-16 h-12 bg-orange-50 overflow-hidden flex items-center justify-center">
      {image ? (
        <img src={image} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-lg text-orange-300">🏨</span>
      )}
    </div>
  );
}

export default RoomImageCell;
