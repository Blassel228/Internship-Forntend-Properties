import FullHeader from "../Components/FullHeader.tsx";
import ImageSection from "../Components/ImageSection.tsx";
import PropertySection from "../Components/PropertySection.tsx";
import PropertyListHeader from "../Components/PropertyListHeader.tsx";
import React from "react";

const HomePage = () => {
  return (
    <>
      <FullHeader />
      <ImageSection />
      <PropertySection />
    </>
  );
};

export default HomePage;
