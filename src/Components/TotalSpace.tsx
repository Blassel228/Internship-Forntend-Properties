import React from "react";
import { FaRegSquare } from "react-icons/fa";
import KeyDetailOverlay from "./KeyDetailOverlay.tsx";
import KeyDetailTitle from "./KeyDetailTitle.tsx";
import KeyDetailDetails from "./KeyDetailDetails.tsx";

const TotalSpace = ({ room }) => {
  return (
    <KeyDetailOverlay>
     <FaRegSquare color="orange" size="30px"/>
      <div>
        <KeyDetailTitle>Total Space</KeyDetailTitle>
        <KeyDetailDetails>Room`s space is {room.total_space} m*2</KeyDetailDetails>
      </div>
    </KeyDetailOverlay>
  );
};

export default TotalSpace;
