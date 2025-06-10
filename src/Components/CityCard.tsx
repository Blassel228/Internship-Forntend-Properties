import React from "react";
import city from "../Images/san-francisko.jpg";

const CityCard = () => {
  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-md max-w-7xl mx-auto my-12">
      <div className="flex flex-col items-center gap-6 sm:gap-8 md:flex-row">
        <div className="w-full md:w-1/2">
          <img
            src={city}
            alt="City Image"
            className="w-full h-64 sm:h-80 md:h-full object-cover rounded-lg"
          />
        </div>

        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            San Francisco: The Heartbeat of Innovation
          </h1>

          <p className="text-base sm:text-lg text-gray-600">
            Discover a city where creativity meets technology. Walk across the iconic Golden Gate Bridge, explore the vibrant streets of Fisherman’s Wharf, and dive into the rich culture of Silicon Valley. Enjoy fresh seafood, breathtaking views, and let San Francisco inspire you with its progressive spirit and diverse energy.
          </p>

          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 sm:py-3 rounded-full font-semibold text-lg w-full sm:w-auto">
            Discover Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CityCard;