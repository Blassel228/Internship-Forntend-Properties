import React from "react";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/property/${property.id}`, { state: { property } });
  };
  return (
    <div
      key={property.id}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      onClick={handleNavigate}
    >
      <img
        src={`data:image/png;base64,${property.image}`}
        alt={property.address}
        className="w-full h-64 object-cover"
      />

      <div className="p-4">
        <span className="bg-pink-200 text-pink-800 px-2 py-1 rounded-full text-sm font-medium mb-2">
          {property.type}
        </span>

        <h2 className="text-xl font-bold mb-2 text-orange-600">
          ${property.price.toFixed(2)}
        </h2>

        <p className="text-lg font-medium mb-2">{property.address}</p>

        <div className="flex flex-wrap gap-2 text-gray-600 text-sm">
          <span>
            Bedrooms: <strong>{property.bedrooms}</strong>
          </span>
          <span>
            Bathrooms: <strong>{property.bathrooms}</strong>
          </span>
          <span>
            Area: <strong>{property.area}</strong>
          </span>
          <span>
            Floor: <strong>{property.floor}</strong>
          </span>
          <span>
            Parking: <strong>{property.parkingSpots} spots</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
