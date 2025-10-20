import React from "react";
import {LuBed} from "react-icons/lu";
import KeyDetailOverlay from "./KeyDetailOverlay.tsx";
import KeyDetailTitle from "./KeyDetailTitle.tsx";
import KeyDetailDetails from "./KeyDetailDetails.tsx";

const Beds = ({ room }) => {
  return (
    <KeyDetailOverlay>
      <span className="hidden sm:inline-flex">
        <LuBed color="orange" size="30px" />
      </span>
      <div>
        <KeyDetailTitle>Beds</KeyDetailTitle>
        <KeyDetailDetails>The room has {room.beds} beds</KeyDetailDetails>
      </div>
    </KeyDetailOverlay>
  );
};

export default Beds;
