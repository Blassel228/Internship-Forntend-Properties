import RoomDetails from "../Components/RoomDetails.tsx";
import FullHeader from "../Components/Header/FullHeader.tsx";
import React from "react";
import ImageWrap from "../Components/ImageWrap.tsx";
import SearchForm from "../Components/SearchForm.tsx";

const RoomPage = () => {
  return (
    <>
      <FullHeader />
      <div className="pt-40 h-[35rem]">
        <ImageWrap />
      </div>
      <SearchForm />
      <div className="min-h-screen flex justify-center flex-col px-[10rem] pb-10">
        <RoomDetails />
      </div>
    </>
  );
};

export default RoomPage;
