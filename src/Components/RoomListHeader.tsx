import React from "react";

const RoomListHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-[4rem] bg-white">
      <div className="text-center space-y-2">
        <span className="text-red-500 font-bold">| ROOMS</span>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black">
          We Provide The Best
        </h1>

        <p className="text-2xl md:text-3xl font-bold text-black">
          Rooms You Like
        </p>
      </div>
    </div>
  );
};

export default RoomListHeader;
