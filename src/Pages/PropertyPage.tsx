import PropertyDetails from "../Components/PropertyDetails.tsx";
import FullHeader from "../Components/FullHeader.tsx";
import { useLocation } from "react-router-dom";
import { Property } from "../Types/types.tsx";
import BookingForm from "../Components/BookingForm.tsx";
import React from "react";
import ImageWrap from "../Components/ImageWrap.tsx";

const PropertyPage = () => {
  const location = useLocation();
  const property: Property = location.state?.property;

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <>
      <FullHeader />
      <div className="pt-40 h-[35rem]">
        <ImageWrap />
      </div>
      <BookingForm property={property} />
      <div className="min-h-screen flex justify-center flex-col px-[10rem] pb-10">
        <PropertyDetails property={property} />
      </div>
    </>
  );
};

export default PropertyPage;
