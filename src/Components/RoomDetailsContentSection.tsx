import React from "react";

const RoomDetailsContentSection = ({ room }: { room: any }) => {
  return (
    <div className="mt-8">
      <p className="mb-4 border-t border-gray-200 pt-4 text-sm sm:text-base">
        {room.description}
      </p>
    </div>
  );
};

export default RoomDetailsContentSection;
