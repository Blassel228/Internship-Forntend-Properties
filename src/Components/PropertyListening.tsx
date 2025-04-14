import React from "react";
import { PropertyDetailsContentSection } from "./PropertyDetailsContentSection.tsx";
import { UsefulLinks } from "./UsefulLinks.tsx";

export const PropertyListening = ({ property }) => {
  return (
    <div className="w-full md:w-1/2 flex flex-col">
      <img
        src={`data:image/png;base64,${property.image}`}
        alt={property.address}
        className="w-full h-96 object-cover rounded-lg shadow-md"
      />
      <span className="bg-pink-200 w-fit text-pink-800 px-2 py-1 text-sm font-medium mt-4 flex justify-center items-center rounded-b-md">
        {property.type}
      </span>
      <h1 className="text-2xl font-bold mt-2">{property.address}</h1>
      <PropertyDetailsContentSection />
      <UsefulLinks />
    </div>
  );
};
