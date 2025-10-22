import React, { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Room } from "../Types/Room";
import * as Avatar from "@radix-ui/react-avatar";
import useDeleteRoom from "../Hooks/useDeleteRoom.tsx";
import Row from "./Row.tsx";

interface RoomDeleteModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
}

const RoomDeleteModal = ({ room, isOpen, onClose }: RoomDeleteModalProps) => {
  const { deleteRoom, isRoomDeleting, deletionError, isSuccess: deletionSuccess } = useDeleteRoom();

  const handleDeleteRoom = async (id: string) => {
    const success = await deleteRoom(id);
    if (success) {
      setTimeout(() => {
        onClose();
      }, 1000);
    }
    return success;
  };

  useEffect(() => {
    if (deletionSuccess) {
        onClose();
    }
  }, [deletionSuccess, onClose]);

  if (!room) return;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-999" onClose={() => {}}>
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
                  Delete Room: {room.type}
                </Dialog.Title>
                <Avatar.Root className="w-full h-full">
                  {room?.image ? (
                    <Avatar.Image
                      src={`data:image/png;base64,${room.image}`}
                      alt="Room preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Avatar.Fallback
                      className="w-full h-full flex items-center justify-center text-gray-400 text-sm bg-gray-100"
                      delayMs={0}
                    >
                      No image
                    </Avatar.Fallback>
                  )}
                </Avatar.Root>
                <p className="font-bold ">
                  Are you sure you wanna{" "}
                  <span className="text-red-600">delete</span> room from the
                  database?
                </p>
                <Row className="gap-4">
                  <button
                    className="bg-red-600 cursor-pointer rounded px-4 py-2 text-white font-bold transition-colors hover:bg-red-700"
                    onClick={() => room?.id && handleDeleteRoom(room.id)}
                  >
                    {isRoomDeleting ? "Deleting..." : "Delete"}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                    disabled={isRoomDeleting}
                  >
                    Cancel
                  </button>
                </Row>
                {deletionError && (
                  <p className="text-red-500 text-sm">
                    Something went wrong while deleting
                  </p>
                )}
                {deletionSuccess && (
                  <p className="text-green-500 text-sm">
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
