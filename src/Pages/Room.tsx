import React from "react";
import ImageWrap from "../Components/Ui/ImageWrap.tsx";
import SearchForm from "../Components/SearchForm/SearchForm.tsx";
import { RoomOverview } from "../Feature/Room/Components/RoomOverview.tsx";
import image from "../Assets/villa.jpg";
import { useLocation } from "react-router-dom";
import { Room as RoomSchema } from "../Types/Room.tsx";

const Room = () => {
  const location = useLocation();
  const room: RoomSchema = location.state?.room;

  return (
    <>
      <ImageWrap image={image} />
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <SearchForm />
        <RoomOverview room={room} />
      </div>
    </>
  );
};

export default Room;
