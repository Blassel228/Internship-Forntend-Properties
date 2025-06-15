import React from 'react';
import FullHeader from '../Components/Header/FullHeader';
import RoomSection from '../Components/RoomSection';
import SearchForm from '../Components/SearchForm';
import Footer from "../Components/Footer/Footer.tsx";

const RoomsPage = () => {
  return (
    <>
      <FullHeader />
      <div className="container mx-auto mt-36 px-4 py-6">
        <SearchForm />
        <RoomSection />
      </div>
      <Footer />
    </>
  );
};

export default RoomsPage;