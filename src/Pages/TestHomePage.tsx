import FullHeader from "../Components/Header/FullHeader.tsx";
import ImageSection from "../Components/ImageSection.tsx";
import React from "react";
import CityCard from "../Components/CityCard.tsx";

const HomePageTest = () => {
  return (
    <>
      <FullHeader />
      <ImageSection />
      <div className="container mx-auto p-6 ">
        <CityCard />
      </div>
    </>
  );
};

export default HomePageTest;
