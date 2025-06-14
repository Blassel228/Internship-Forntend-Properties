import React, {useState} from 'react';
import FullHeader from '../Components/Header/FullHeader';
import RoomSection from '../Components/RoomSection';
import SearchForm from '../Components/SearchForm';
import {Room} from "../Types/types.tsx";

const RoomsPage = () => {
  return (
    <>
      <FullHeader />
      <div className="container mx-auto mt-36 px-4 py-6">
        <SearchForm />
        <RoomSection />
      </div>
    </>
  );
};

export default RoomsPage;