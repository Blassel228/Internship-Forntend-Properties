import React from "react";

const RoomDetailsContentSection = ({ room }) => {
  return (
    <div className="mt-6">
      <p className="mb-4 border-t border-gray-200 pt-4 text-sm sm:text-base leading-relaxed text-justify">
        {room.description}
      </p>
    </div>
  );
};
export default RoomDetailsContentSection;
