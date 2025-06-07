import React, { useState } from "react";
import NavigationArrow from "./NavigationArrow";

import hotel1 from "../Images/hotel1.jpg";
import hotel2 from "../Images/hotel2.jpg";
import hotel3 from "../Images/hotel3.jpg";

const ImageSection = () => {
  const images = [hotel1, hotel2, hotel3];
  const locations = ["Toronto, Canada", "Banff, Canada", "Vancouver, Canada"];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const changeImage = (direction: "next" | "prev") => {
    setCurrentImageIndex((prevIndex) => {
      if (direction === "next") {
        return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      } else {
        return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      }
    });
  };

  return (
    <section className="relative w-full h-[600px] overflow-hidden mt-36">
      <div className="w-full h-full relative">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Cabin view ${index + 1}`}
            className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center text-white z-10">
        <h1 className="text-4xl font-bold leading-tight text-center mb-4">
          HURRY!
          <br />
          GET THE BEST
          <br />
          HOTEL ROOM FOR YOU
        </h1>
      </div>

      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
        <NavigationArrow direction="left" onClick={() => changeImage("prev")} />
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
        <NavigationArrow
          direction="right"
          onClick={() => changeImage("next")}
        />
      </div>
    </section>
  );
};

export default ImageSection;
