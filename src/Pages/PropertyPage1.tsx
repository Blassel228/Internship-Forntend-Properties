import RoomDetails from "../Components/RoomDetails.tsx";
import FullHeader from "../Components/FullHeader.tsx";

const PropertyPage1 = ({ property }) => {
  return (
    <>
      <FullHeader />
      <RoomDetails property={property} />
    </>
  );
};

export default PropertyPage1;
