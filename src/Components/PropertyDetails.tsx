import React from "react";
import { useParams } from "react-router-dom";
import { UsefulLinks } from "./UsefulLinks.tsx";
import { PropertyDetailsContentSection } from "./PropertyDetailsContentSection.tsx";
import { Property } from "../Types/types.tsx";
import { PropertyListening } from "./PropertyListening.tsx";
import KeyDetails from "./KeyDetails.tsx";
import ImageWrap from "./ImageWrap.tsx";

interface PropertyDetailsProps {
  property: Property;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
  const { id } = useParams();
  return (
    <>
      <div className="pt-40 h-[35rem]">
        <ImageWrap />
      </div>
      <div className="min-h-screen flex justify-center flex-col pt-40 px-[10rem] pb-10">
        <div className="flex flex-row items-stretch justify-center gap-16 h-full">
          <PropertyListening property={property} />
          <KeyDetails property={property} />
        </div>
      </div>
    </>
  );
};

export default PropertyDetails;
