import React from "react";
import {TbBath} from "react-icons/tb";
import KeyDetailOverlay from "./KeyDetailOverlay.tsx";
import KeyDetailTitle from "./KeyDetailTitle.tsx";
import KeyDetailDetails from "./KeyDetailDetails.tsx";

const Bathes = ({ room }) => {
  return (
    <KeyDetailOverlay>
      <span className="hidden sm:inline-flex">
        <TbBath color="orange" size="30px" />
      </span>
      <div>
        <KeyDetailTitle>Bathes</KeyDetailTitle>
        <KeyDetailDetails>The room has {room.bathes} bathes</KeyDetailDetails>
      </div>
    </KeyDetailOverlay>
  );
};

export default Bathes;
