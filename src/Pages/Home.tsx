import ImageSection from "../Feature/Home/ImageSection.tsx";
import React from "react";
import CityCard from "../Feature/Home/CityCard.tsx";
import ExclusiveBenefits from "../Feature/Home/ExclusiveBenefits.tsx";
import SpecialDeals from "../Feature/Home/SpecialDeals.tsx";
import PopularRooms from "../Feature/Home/PopularRooms.tsx";
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
