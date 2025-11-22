import React from "react";
import SearchForm from "../Components/SearchForm/SearchForm.tsx";
import RoomListHeader from "../Feature/Rooms/RoomListHeader.tsx";
import RoomList from "../Feature/Rooms/RoomList.tsx";
import ImageWrap from "../Components/Ui/ImageWrap.tsx";
import image from "../Assets/moreno.jpg";

const Rooms = () => {
  return (
    <>
      <ImageWrap image={image} />
      <div className="container mx-auto px-4 py-6">
        <SearchForm />
        <RoomListHeader />
        <RoomList />
      </div>
    </>
  );
};

export default Rooms;
