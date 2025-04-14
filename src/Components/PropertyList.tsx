import React from "react";
import { Property } from "../Types/types.tsx";
import PropertyCard from "./PropertyCard.tsx";

interface HotelRoomListProps {
  properties: Property[] | undefined;
}

const PropertyList: React.FC<HotelRoomListProps> = ({ properties }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-[10rem]">
      {properties?.map((property) => <PropertyCard property={property} />)}
    </div>
  );
};

export default PropertyList;
