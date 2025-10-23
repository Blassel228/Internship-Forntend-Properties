import React from "react";
import ImageWrap from "../Components/ImageWrap.tsx";
import SearchForm from "../Components/SearchForm.tsx";
import { RoomOverview } from "../Components/RoomOverview.tsx";
import image from "../Images/villa.jpg";
import { useLocation } from "react-router-dom";
import { Room as RoomSchema } from "../Types/Room.tsx";

const Room = () => {
  const location = useLocation();
  const room: RoomSchema = location.state?.room;

  return (
    <>
      <ImageWrap image={image} />
      <SearchForm />
      <RoomOverview room={room} />
    </>
  );
};

export default Room;
