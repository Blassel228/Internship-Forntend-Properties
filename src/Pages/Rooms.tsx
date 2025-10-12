import React from "react";
import FullHeader from "../Components/Header/FullHeader";
import SearchForm from "../Components/SearchForm";
import Footer from "../Components/Footer/Footer.tsx";
import RoomListHeader from "../Components/RoomListHeader.tsx";
import RoomList from "../Components/RoomList.tsx";
import ImageWrap from "../Components/ImageWrap.tsx";
import image from "../Images/moreno.jpg";

const Rooms = () => {
  return (
    <>
      <FullHeader />
      <ImageWrap image={image}/>
      <div className="container mx-auto px-4 py-6">
        <SearchForm />
        <RoomListHeader />
        <RoomList />
      </div>
      <Footer />
    </>
  );
};

export default Rooms;
