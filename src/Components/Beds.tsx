import React from "react";
import { LuBed } from "react-icons/lu";
import KeyDetailOverlay from "./KeyDetailOverlay.tsx";
import KeyDetailTitle from "./KeyDetailTitle.tsx";
import KeyDetailDetails from "./KeyDetailDetails.tsx";

const Beds = ({ room }) => {
  return (
    <KeyDetailOverlay>
     <LuBed color="orange" size="30px"/>
      <div>
        <KeyDetailTitle>Beds</KeyDetailTitle>
        <KeyDetailDetails>The room has {room.beds} beds</KeyDetailDetails>
      </div>
    </KeyDetailOverlay>
  );
};

export default Beds;
