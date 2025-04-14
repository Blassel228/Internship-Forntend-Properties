import PropertyDetails from "../Components/PropertyDetails.tsx";
import FullHeader from "../Components/FullHeader.tsx";
import { useLocation } from "react-router-dom";
import { Property } from "../Types/types.tsx";

const PropertyPage = () => {
  const location = useLocation();
  const property: Property = location.state?.property;

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <>
      <FullHeader />
      <PropertyDetails property={property} />
    </>
  );
};

export default PropertyPage;
