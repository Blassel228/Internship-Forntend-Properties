import React from "react";
import { useParams } from "react-router-dom";
import { UsefulLinks } from "./UsefulLinks.tsx";
import { PropertyDetailsContentSection } from "./PropertyDetailsContentSection.tsx";
import { Property } from "../Types/types.tsx";
import { PropertyListening } from "./PropertyListening.tsx";
import KeyDetails from "./KeyDetails.tsx";
import ImageWrap from "./ImageWrap.tsx";
import BookingForm from "./BookingForm.tsx";

interface PropertyDetailsProps {
  property: Property;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
  return (
    <>
      <div className="flex flex-row items-stretch justify-center gap-16 h-full ">
        <PropertyListening property={property} />
        <KeyDetails property={property} />
      </div>
    </>
  );
};

export default PropertyDetails;
