import React from "react";
import ImageWrap from "../Components/ImageWrap.tsx";
import SearchForm from "../Components/SearchForm.tsx";
import {RoomOverview} from "../Components/RoomOverview.tsx";
import image from "../Images/villa.jpg";

const Room = () => {
  return (
    <>
      <ImageWrap image={image}/>
      <SearchForm />
      <RoomOverview />
    </>
  );
};

export default Room;
