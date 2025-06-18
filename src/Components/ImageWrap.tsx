import React from "react";
import image from "../Images/villa.jpg";

const ImageWrap = () => {
  return (
    <div
      className="relative bg-cover bg-center h-full"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center px-4 text-white">
          BOOK A COMFORTABLE ROOM
        </h1>
      </div>
    </div>
  );
};

export default ImageWrap;
