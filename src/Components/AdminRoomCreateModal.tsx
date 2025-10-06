import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RoomCreate } from "../Types/Room";
import useCreateRoom from "../Hooks/useCreateRoom";
import RoomEditModalField from "./RoomEditModalField";
import { useForm } from "react-hook-form";
import roomType from "../Enums/roomType";
import roomArea from "../Enums/roomArea";
import AvatarImage from "./AvatarImage.tsx";

interface AdminRoomCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminRoomCreateModal = ({
  isOpen,
  onClose,
}: AdminRoomCreateModalProps) => {
  const { createRoom, isRoomCreating } = useCreateRoom();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File, null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<RoomCreate>({
    defaultValues: {
      image: "",
      type: "",
      price: 0,
      beds: 1,
      bedrooms: 1,
      bathes: 1,
      floor: 1,
      area: "",
      capacity: 1,
      description: "",
      total_space: 0,
      has_jacuzzi: false,
      has_sauna: false,
    },
  });

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImagePreview(base64String);
      setValue("image", base64String, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: RoomCreate) => {
    createRoom(
      { room: data, image: imageFile },
      {
        onSuccess: () => {
          reset();
          setImagePreview(null);
          setImageFile(null);
          onClose();
        },
      },
    );
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-999" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl">
                <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                  Create Room
                </Dialog.Title>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Room Type
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
                      {...register("type", {
                        required: "Room type is required",
                      })}
                    >
                      {Object.values(roomType).map((type) => (
                        <option value={type} key={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.type && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.type.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Area
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
                      {...register("area", { required: "Area is required" })}
                    >
                      {Object.values(roomArea).map((area) => (
                        <option value={area} key={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                    {errors.area && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.area.message}
                      </p>
                    )}
                  </div>

                  <RoomEditModalField
                    label="Beds"
                    type="number"
                    min={1}
                    max={5}
                    {...register("beds", {
                      required: "Beds field is required",
                      valueAsNumber: true,
                      min: { value: 1, message: "At least 1 bed" },
                    })}
                  />
                  {errors.beds && (
                    <p className="text-red-500 text-sm">
                      {errors.beds.message}
                    </p>
                  )}

                  <RoomEditModalField
                    label="Bedrooms"
                    type="number"
                    min={1}
                    max={3}
                    {...register("bedrooms", {
                      required: "Bedrooms field is required",
                      valueAsNumber: true,
                      min: { value: 1, message: "At least 1 bedroom" },
                    })}
                  />
                  {errors.bedrooms && (
                    <p className="text-red-500 text-sm">
                      {errors.bedrooms.message}
                    </p>
                  )}

                  <RoomEditModalField
                    label="Bathes"
                    type="number"
                    min={1}
                    max={3}
                    {...register("bathes", {
                      required: "Bathes field is required",
                      valueAsNumber: true,
                      min: { value: 1, message: "At least 1 bath" },
                    })}
                  />
                  {errors.bathes && (
                    <p className="text-red-500 text-sm">
                      {errors.bathes.message}
                    </p>
                  )}

                  <RoomEditModalField
                    label="Capacity (people)"
                    type="number"
                    min={1}
                    max={10}
                    {...register("capacity", {
                      required: "Capacity is required",
                      valueAsNumber: true,
                      min: { value: 1, message: "At least 1 person" },
                    })}
                  />
                  {errors.capacity && (
                    <p className="text-red-500 text-sm">
                      {errors.capacity.message}
                    </p>
                  )}

                  <RoomEditModalField
                    label="Price ($)"
                    type="number"
                    min={0}
                    max={1000}
                    step="0.01"
                    {...register("price", {
                      required: "Price is required",
                      valueAsNumber: true,
                      min: { value: 0, message: "Price can't be negative" },
                      max: { value: 1000, message: "Max price is $1000" },
                    })}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm">
                      {errors.price.message}
                    </p>
                  )}

                  <RoomEditModalField
                    label="Floor"
                    type="number"
                    min={1}
                    max={20}
                    {...register("floor", {
                      required: "Floor is required",
                      valueAsNumber: true,
                      min: { value: 1, message: "Floor must be at least 1" },
                    })}
                  />
                  {errors.floor && (
                    <p className="text-red-500 text-sm">
                      {errors.floor.message}
                    </p>
                  )}

                  <RoomEditModalField
                    label="Total Space (m²)"
                    type="number"
                    min={10}
                    max={200}
                    {...register("total_space", {
                      required: "Total space is required",
                      valueAsNumber: true,
                      min: { value: 10, message: "At least 10 m²" },
                    })}
                  />
                  {errors.total_space && (
                    <p className="text-red-500 text-sm">
                      {errors.total_space.message}
                    </p>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      {...register("description", {
                        required: "Description is required",
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows={3}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-center">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image Preview
                    </label>
                    <div className="w-32 h-32  overflow-hidden border-4 border-orange-100 bg-gray-100 flex items-center justify-center">
                      <AvatarImage
                        src={imagePreview}
                        imageClassName="w-full h-full object-cover"
                        fallbackClassName="w-full h-full flex items-center justify-center text-gray-400 text-sm bg-gray-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={onFileChange}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Amenities
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        {...register("has_sauna")}
                        className="rounded text-orange-500 focus:ring-orange-500"
                      />
                      <span>Has Sauna</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        {...register("has_jacuzzi")}
                        className="rounded text-orange-500 focus:ring-orange-500"
                      />
                      <span>Has Jacuzzi</span>
                    </label>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                      disabled={isRoomCreating || isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-60 cursor-pointer"
                      disabled={isRoomCreating || isSubmitting}
                    >
                      {isRoomCreating ? "Creating..." : "Save"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AdminRoomCreateModal;
