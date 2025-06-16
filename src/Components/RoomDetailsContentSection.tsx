import React from "react";

const RoomDetailsContentSection = ({ room }: { room: any }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Description</h2>
      <p className="mb-4 text-sm sm:text-base">{room.description}</p>
    </div>
  );
};

export default RoomDetailsContentSection ;