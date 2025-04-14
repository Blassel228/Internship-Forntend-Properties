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
        <div className="bg-white px-4 py-2 rounded-lg mb-8">
          <p className="text-sm font-medium text-black font-poppins">
            Home / Single Property
          </p>
        </div>
        <h1 className="text-5xl font-bold">SINGLE PROPERTY</h1>
      </div>
    </div>
  );
};

export default ImageWrap;
