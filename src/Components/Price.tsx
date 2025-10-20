import React from "react";
import {IoPricetagOutline} from "react-icons/io5";
import KeyDetailOverlay from "./KeyDetailOverlay.tsx";
import KeyDetailTitle from "./KeyDetailTitle.tsx";
import KeyDetailDetails from "./KeyDetailDetails.tsx";

const Price = ({ room }) => {
  return (
    <KeyDetailOverlay className="flex items-center gap-4 border-b border-gray-200 pb-4">
      <span className="hidden sm:inline-flex">
        <IoPricetagOutline color="orange" size="30px" />
      </span>
      <div>
        <KeyDetailTitle>Price</KeyDetailTitle>
        <KeyDetailDetails>Price is ${room.price} for a day</KeyDetailDetails>
      </div>
    </KeyDetailOverlay>
  );
};

export default Price;
