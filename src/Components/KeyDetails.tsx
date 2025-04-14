import React from "react";
import Contract from "./Contract.tsx";
import Payment from "./Payment.tsx";
import Safety from "./Safety.tsx";
import TotalSpace from "./TotalSpace.tsx";

const KeyDetails = ({ property }) => {
  return (
    <div className="flex flex-col w-[20%] bg-white p-4 gap-6 rounded-lg shadow-md h-full">
      <TotalSpace property={property} />
      <Contract />
      <Payment />
      <Safety />
    </div>
  );
};

export default KeyDetails;
