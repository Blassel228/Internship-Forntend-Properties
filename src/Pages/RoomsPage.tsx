import React from 'react';
import FullHeader from '../Components/Header/FullHeader';
import SearchForm from '../Components/SearchForm';
import Footer from "../Components/Footer/Footer.tsx";
import RoomListHeader from "../Components/RoomListHeader.tsx";
import RoomList from "../Components/RoomList.tsx";

const RoomsPage = () => {
  return (
    <>
      <FullHeader />
      <div className="container mx-auto mt-36 px-4 py-6">
        <SearchForm />
        <RoomListHeader />
        <RoomList/>
      </div>
      <Footer />
    </>
  );
};

export default RoomsPage;