import React from "react";
import ImageWrap from "../Components/ImageWrap.tsx";
import SearchForm from "../Components/SearchForm.tsx";
import {RoomOverview} from "../Components/RoomOverview.tsx";
import image from "../Images/villa.jpg";
import {useParams} from "react-router-dom";
import useRoom from "../Hooks/useRoom.tsx";

const Room = () => {
  const { id } = useParams<{ id: string }>(); // ✅ замість useSearchParams
  const { room, isLoading, error } = useRoom(id);

  if (isLoading) {
    return <p className="text-center mt-10">Loading room...</p>;
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">
        Error loading room details.
      </p>
    );
  }

  if (!room) {
    return (
      <p className="text-center mt-10 text-gray-600">
        No room found with this ID.
      </p>
    );
  }

  return (
    <>
      <ImageWrap image={image} />
      <SearchForm />
      <RoomOverview room={room} />
    </>
  );
};

export default Room;
