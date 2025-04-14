import React from "react";
import PropertyListHeader from "./PropertyListHeader.tsx";
import PropertyList from "./PropertyList.tsx";
import { usePropertiesQuery } from "../Hooks/useProperty.tsx";

const PropertySection: React.FC = () => {
  const { data: properties } = usePropertiesQuery();

  return (
    <>
      <PropertyListHeader />
      <PropertyList properties={properties} />
    </>
  );
};

export default PropertySection;
