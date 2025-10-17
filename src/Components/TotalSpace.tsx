import React from "react";
import { FaRegSquare } from "react-icons/fa";
import KeyDetailOverlay from "./KeyDetailOverlay.tsx";
import KeyDetailTitle from "./KeyDetailTitle.tsx";
import KeyDetailDetails from "./KeyDetailDetails.tsx";

const TotalSpace = ({ room }) => {
  return (
    <KeyDetailOverlay>
      <span className="hidden sm:inline-flex">
        <FaRegSquare color="orange" size={24} />
      </span>
      <div>
        <KeyDetailTitle>Space</KeyDetailTitle>
        <KeyDetailDetails>
          Space is {room.total_space} m*2
        </KeyDetailDetails>
      </div>
    </KeyDetailOverlay>
  );
};

export default TotalSpace;
