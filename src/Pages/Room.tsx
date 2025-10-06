import FullHeader from "../Components/Header/FullHeader.tsx";
import React from "react";
import ImageWrap from "../Components/ImageWrap.tsx";
import SearchForm from "../Components/SearchForm.tsx";
import { RoomOverview } from "../Components/RoomOverview.tsx";
import Footer from "../Components/Footer/Footer.tsx";

const Room = () => {
  return (
    <>
      <FullHeader />
      <div className="pt-40 h-[35rem]">
        <ImageWrap />
      </div>
      <SearchForm />
      <RoomOverview />
      <Footer />
    </>
  );
};

export default Room;
