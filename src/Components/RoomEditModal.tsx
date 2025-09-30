import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Room, RoomUpdate } from "../Types/Room";
import useUpdateRoom from "../Hooks/useUpdateRoom";
import RoomEditModalField from "./RoomEditModalField";
import { useForm } from "react-hook-form";
import roomType from "../Enums/roomType.tsx";

interface RoomEditModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
}

const RoomEditModal = ({ room, isOpen, onClose }: RoomEditModalProps) => {
  const { updateRoom, isRoomUpdating } = useUpdateRoom();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<RoomUpdate>({
    defaultValues: {
      type: room?.type || "",
      beds: room?.beds || 1,
      capacity: room?.capacity || 1,
      price: room?.price || 0,
    },
  });

  useEffect(() => {
    if (room) {
      reset({
        type: room.type,
        beds: room.beds,
        capacity: room.capacity,
        price: room.price,
      });
    }
  }, [room, reset]);

  const onSubmit = (data: RoomUpdate) => {
    if (!room) return;
    updateRoom(
      { roomId: room.id, updatedData: data },
      {
        onSuccess: () => onClose(),
      }
    );
  };

  if (!room) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-999" onClose={onClose}>
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
                  Edit Room: {room.type}
                </Dialog.Title>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
                    {...register("type", { required: "Room type is required" })}
                  >
                    {Object.values(roomType).map((type) => (
                      <option value={type} key={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.type && (
                    <p className="text-red-500 text-sm">{errors.type.message}</p>
                  )}

                  <RoomEditModalField
                    label="Beds"
                    type="number"
                    max={5}
                    min={1}
                    {...register("beds", {
                      required: "Beds field is required",
                      valueAsNumber: true,
                      min: { value: 1, message: "Beds must be at least 1" },
                    })}
                  />
                  {errors.beds && (
                    <p className="text-red-500 text-sm">{errors.beds.message}</p>
                  )}

                  <RoomEditModalField
                    label="Capacity (people)"
                    type="number"
                    max={10}
                    min={1}
                    {...register("capacity", {
                      required: "Capacity field is required",
                      valueAsNumber: true,
                      min: {
                        value: 1,
                        message: "Capacity must be at least 1",
                      },
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
                      max: {
                        value: 1000,
                        message: "The price cannot be greater than 1000",
                      },
                      min: {
                        value: 0,
                        message: "The price cannot be lower than 0",
                      },
                      required: "Price field is required",
                      valueAsNumber: true,
                    })}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm">{errors.price.message}</p>
                  )}

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      disabled={isRoomUpdating || isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-60"
                      disabled={isRoomUpdating || isSubmitting}
                    >
                      {isRoomUpdating ? "Saving..." : "Save"}
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

export default RoomEditModal;
