import FullHeader from "../Components/Header/FullHeader.tsx";
import React from "react";
import ImageWrap from "../Components/ImageWrap.tsx";
import SearchForm from "../Components/SearchForm.tsx";
import {RoomOverview} from "../Components/RoomOverview.tsx";
import KeyDetails from "../Components/KeyDetails.tsx";
import Footer from "../Components/Footer/Footer.tsx";

const RoomPage = () => {
  return (
    <>
      <FullHeader />
      <div className="pt-40 h-[35rem]">
        <ImageWrap />
      </div>
      <SearchForm />
      <div className="min-h-screen flex justify-center flex-col px-[10rem] pb-10">
        <div className="flex flex-row items-stretch justify-center gap-16 h-full ">
          <RoomOverview />
          <KeyDetails />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RoomPage;
