import React, { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Room } from "../../../Types/Room.tsx";
import * as Avatar from "@radix-ui/react-avatar";
import useDeleteRoom from "../Hooks/useDeleteRoom.tsx";
import Row from "../../../Components/Ui/Row.tsx";

interface RoomDeleteModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
}

const RoomDeleteModal = ({ room, isOpen, onClose }: RoomDeleteModalProps) => {
  const {
    deleteRoom,
    isRoomDeleting,
    deletionError,
    deletionSuccess,
  } = useDeleteRoom();

    console.log('Modal state:', { isOpen, room, deletionSuccess, isRoomDeleting });

  const handleDeleteRoom = async (id: string) => {
    await deleteRoom(id);
  };

  useEffect(() => {
    if (deletionSuccess) {
      const timer = setTimeout(() => {
        onClose();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [deletionSuccess, onClose]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                  Delete Room: {room?.type}
                </Dialog.Title>
                <Avatar.Root className="w-full h-48 mb-4">
                  {room?.image ? (
                    <Avatar.Image
                      src={`data:image/png;base64,${room.image}`}
                      alt="Room preview"
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <Avatar.Fallback className="w-full h-full flex items-center justify-center text-gray-400 text-sm bg-gray-100">
                      No image
                    </Avatar.Fallback>
                  )}
                </Avatar.Root>
                <p className="font-bold mb-4">
                  Are you sure you want to{" "}
                  <span className="text-red-600">delete</span> this room from the database?
                </p>
                <Row className="gap-4">
                  <button
                    className="bg-red-600 cursor-pointer rounded px-4 py-2 text-white font-bold transition-colors hover:bg-red-700 disabled:opacity-50"
                    onClick={() => room?.id && handleDeleteRoom(room.id)}
                    disabled={isRoomDeleting}
                  >
                    {isRoomDeleting ? "Deleting..." : "Delete"}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors cursor-pointer disabled:opacity-50"
                    disabled={isRoomDeleting}
                  >
                    Cancel
                  </button>
                </Row>
                {deletionError && (
                  <p className="text-red-500 text-sm mt-2">
                    Something went wrong while deleting
                  </p>
                )}
                {deletionSuccess && (
                  <p className="text-green-500 text-sm mt-2">
                    Room deleted successfully!
                  </p>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RoomDeleteModal;