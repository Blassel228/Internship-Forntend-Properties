import React from "react";
import vacation_photo1 from "../Images/vacation1.jpg";
import vacation_photo2 from "../Images/vacation2.jpg"

const SpecialDeals = () => {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Special Deals</h2>
      <div className="flex flex-col md:flex-row gap-6 items-stretch justify-center">
        <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-2xl w-full flex flex-row">
          <img
            src={vacation_photo1}
            alt="City"
            className="w-48 h-40 object-cover"
          />
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-xl font-bold mb-2">Plan & Save</h3>
            <p className="text-gray-600 flex-grow">
              As a Radisson Rewards member, you enjoy exclusive benefits.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-2xl w-full flex flex-row">
          <img
            src={vacation_photo2}
            alt="Hotel"
            className="w-48 h-40 object-cover"
          />
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-xl font-bold mb-2">First time's a charm</h3>
            <p className="text-gray-600 flex-grow">
              Enjoy special offers for your first stay.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SpecialDeals;