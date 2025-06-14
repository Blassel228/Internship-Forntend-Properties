import FullHeader from "../Components/Header/FullHeader.tsx";
import ImageSection from "../Components/ImageSection.tsx";
import RoomSection from "../Components/RoomSection.tsx";
import React from "react";
import CityCard from "../Components/CityCard.tsx";
import ExclusiveBenefits from "../Components/ExclusiveBenefits.tsx";
import SpecialDeals from "../Components/SpecialDeals.tsx";
import PopularRooms from "../Components/PopularRooms.tsx";
import Footer from "../Components/Footer/Footer.tsx";
import SearchForm from "../Components/SearchForm.tsx";

const HomePage = () => {
  return (
    <>
      <FullHeader />
      <ImageSection />
      <SearchForm />
      <div className="mx-auto p-6 lg:w-[70%] sm:w-[90%]">
        <PopularRooms />
        <CityCard />
        <ExclusiveBenefits />
        <SpecialDeals />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
