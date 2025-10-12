import FullHeader from "../Components/Header/FullHeader.tsx";
import React from "react";
import ImageWrap from "../Components/ImageWrap.tsx";
import SearchForm from "../Components/SearchForm.tsx";
import {RoomOverview} from "../Components/RoomOverview.tsx";
import Footer from "../Components/Footer/Footer.tsx";
import image from "../Images/villa.jpg";

const Room = () => {
  return (
    <>
      <FullHeader />
      <ImageWrap image={image}/>
      <SearchForm />
      <RoomOverview />
      <Footer />
    </>
  );
};

export default Room;
