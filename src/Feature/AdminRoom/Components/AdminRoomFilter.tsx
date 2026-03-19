import Row from "../../../Components/Ui/Row.tsx";
import Column from "../../../Components/Ui/Column.tsx";
import { useState } from "react";
import AdminRoomFilterInput from "./AdminRoomFilterInput.tsx";
import { useForm } from "react-hook-form";
import { RoomFilters } from "../../../Types/Room.tsx";
import AdminPriceFilter from "./AdminPriceFilter.tsx";
import roomType from "../../../Enums/roomType.tsx";
import roomArea from "../../../Enums/roomArea.tsx";
import AdminRoomCreateModal from "./AdminRoomCreateModal.tsx";

interface AdminRoomFilterProps {
  onFilterSubmit: (filters: RoomFilters) => void;
}

const AdminRoomFilter = ({ onFilterSubmit }: AdminRoomFilterProps) => {
  const { register, handleSubmit } = useForm<RoomFilters>();

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const onSubmit = (data: RoomFilters) => {
    const filters: RoomFilters = {
      ...data,
      lowest_price: priceRange[0],
      greatest_price: priceRange[1],
      type: data.type === "All" ? null : data.type,
      area: data.area === "All" ? null : data.area,
      capacity: data.capacity || null,
      bedrooms: data.bedrooms || null,
      bathes: data.bathes || null,
    };
    onFilterSubmit(filters);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Column className="shadow-xl rounded-xl bg-orange-50 px-4 py-4 gap-8">
          <p className="text-lg text-gray-800 font-semibold">Information</p>

          <Row className="flex flex-col sm:flex-row gap-4">
            <select
              className="w-full h-12 px-4 rounded-2xl border border-orange-300 bg-white placeholder-orange-300 text-gray-800 appearance-none outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:ring-opacity-50"
              {...register("type")}
              defaultValue="All"
            >
              <option value="All">All</option>
              {Object.values(roomType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <AdminRoomFilterInput
              placeholder="Capacity"
              {...register("capacity", { valueAsNumber: true })}
            />
          </Row>

          <Row className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AdminRoomFilterInput
              placeholder="Bedrooms"
              {...register("bedrooms", { valueAsNumber: true })}
            />
            <AdminRoomFilterInput
              placeholder="Bathes"
              {...register("bathes", { valueAsNumber: true })}
            />
          </Row>

          <select
            className="w-full h-12 px-4 rounded-2xl border border-orange-300 bg-white placeholder-orange-300 text-gray-800 appearance-none outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:ring-opacity-50"
            {...register("area")}
            defaultValue="All"
          >
            <option value="All">All</option>
            {Object.values(roomArea).map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>

          <div className="flex justify-between px-2">
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">From</span>
              <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-orange-200 flex items-center gap-1">
                <span className="text-orange-500 font-bold text-sm">$</span>
                <span className="text-gray-800 font-semibold">
                  {priceRange[0]}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">To</span>
              <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-orange-200 flex items-center gap-1">
                <span className="text-orange-500 font-bold text-sm">$</span>
                <span className="text-gray-800 font-semibold">
                  {priceRange[1]}
                </span>
              </div>
            </div>
          </div>
          <AdminPriceFilter
            setPriceRange={setPriceRange}
            priceRange={priceRange}
          />

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 h-10 rounded-xl text-white cursor-pointer flex items-center justify-center px-4 font-medium w-full"
          >
            Search
          </button>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-green-500 hover:bg-green-600 h-10 rounded-xl text-white cursor-pointer flex items-center justify-center px-4 font-medium w-full"
          >
            Add room
          </button>
        </Column>
      </form>

      <AdminRoomCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
};

export default AdminRoomFilter;
