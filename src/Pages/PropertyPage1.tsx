import PropertyDetails from "../Components/PropertyDetails.tsx";
import FullHeader from "../Components/FullHeader.tsx";

const PropertyPage1 = ({ property }) => {
  return (
    <>
      <FullHeader />
      <PropertyDetails property={property} />
    </>
  );
};

export default PropertyPage1;
