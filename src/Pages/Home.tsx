import ImageSection from "../Components/ImageSection.tsx";
import React from "react";
import CityCard from "../Components/CityCard.tsx";
import ExclusiveBenefits from "../Components/ExclusiveBenefits.tsx";
import SpecialDeals from "../Components/SpecialDeals.tsx";
import PopularRooms from "../Components/PopularRooms.tsx";
import SearchForm from "../Components/SearchForm.tsx";

const HomePage = () => {
  return (
    <>
      <ImageSection />
      <SearchForm />
      <div className="mx-auto p-6 lg:w-[70%] sm:w-[90%]">
        <PopularRooms />
        <CityCard />
        <ExclusiveBenefits />
        <SpecialDeals />
      </div>
    </>
  );
};

export default HomePage;
