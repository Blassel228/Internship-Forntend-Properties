import React, { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import * as Avatar from "@radix-ui/react-avatar";
import Row from "./Row.tsx";

// Компонент для відображення зображення
const ItemImage = <T,>({
  item,
  getImageUrl,
  imageClassName = "w-full h-full object-cover",
  fallbackClassName = "w-full h-full flex items-center justify-center text-gray-400 text-sm bg-gray-100"
}: {
  item: T;
  getImageUrl?: (item: T) => string | undefined;
  imageClassName?: string;
  fallbackClassName?: string;
}) => {
  if (!getImageUrl) return null;

  const imageUrl = getImageUrl(item);

  return (
    <Avatar.Root className="w-full h-full mb-4 flex items-center justify-center">
      {imageUrl ? (
        <Avatar.Image
          src={imageUrl}
          alt="Item preview"
          className={imageClassName}
        />
      ) : (
        <Avatar.Fallback
          className={fallbackClassName}
          delayMs={0}
        >
          No image
        </Avatar.Fallback>
      )}
    </Avatar.Root>
  );
};

// Компонент для відображення заголовка
const ModalTitle = <T,>({ item, title }: { item: T; title: (item: T) => string }) => {
  return (
    <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
      {title(item)}
    </Dialog.Title>
  );
};

// Компонент для відображення повідомлення підтвердження
const ConfirmationMessage = ({
  message,
  centerText = false
}: {
  message: string;
  centerText?: boolean;
}) => {
  return (
    <p className={`font-bold ${centerText ? 'text-center' : ''}`}>
      {message}
    </p>
  );
};

// Компонент для кнопок дій
const ActionButtons = <T,>({
  item,
  isDeleting,
  onDelete,
  onClose
}: {
  item: T;
  isDeleting: boolean;
  onDelete: (id: string) => Promise<boolean>;
  onClose: () => void;
}) => {
  const itemId = (item as any).id;

  const handleDelete = async () => {
    if (itemId) {
      return await onDelete(itemId);
    }
  };

  return (
    <Row className="gap-4 mt-4">
      <button
        className="bg-red-600 cursor-pointer rounded px-4 py-2 text-white font-bold transition-colors hover:bg-red-700"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
        disabled={isDeleting}
      >
        Cancel
      </button>
    </Row>
  );
};

// Компонент для відображення повідомлень про помилки
const ErrorMessage = ({ error }: { error: unknown }) => {
  if (!error) return null;

  return (
    <p className="text-red-500 text-sm mt-2">
      Something went wrong while deleting
    </p>
  );
};

// Компонент для відображення повідомлень про успіх
const SuccessMessage = <T,>({
  success,
  item,
  itemName
}: {
  success: boolean;
  item: T;
  itemName: (item: T) => string
}) => {
  if (!success) return null;

  return (
    <p className="text-green-500 text-sm mt-2">
      {itemName(item)} deleted successfully!
    </p>
  );
};

// Основний універсальний компонент для видалення
interface GenericDeleteModalProps<T> {
  item: T | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => Promise<boolean>;
  isDeleting: boolean;
  deletionError: unknown;
  deletionSuccess: boolean;
  title: (item: T) => string;
  getImageUrl?: (item: T) => string | undefined;
  itemName: (item: T) => string;
  confirmationMessage?: string;
  showImage?: boolean;
  centerText?: boolean;
  imageClassName?: string;
  fallbackClassName?: string;
  dialogClassName?: string;
}

const GenericDeleteModal = <T,>({
  item,
  isOpen,
  onClose,
  onDelete,
  isDeleting,
  deletionError,
  deletionSuccess,
  title,
  getImageUrl,
  itemName,
  confirmationMessage = "Are you sure you want to delete this item from the database?",
  showImage = true,
  centerText = false,
  imageClassName = "w-32 h-32 object-cover rounded-lg",
  fallbackClassName = "w-32 h-32 flex items-center justify-center text-gray-400 text-sm bg-gray-100 rounded-lg",
  dialogClassName = "w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl"
}: GenericDeleteModalProps<T>) => {
  useEffect(() => {
    if (deletionSuccess) {
      const timer = setTimeout(() => {
        onClose();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [deletionSuccess, onClose]);

  if (!item) return null;

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
              <Dialog.Panel className={dialogClassName}>
                <ModalTitle item={item} title={title} />
                {showImage && getImageUrl && (
                  <div className="flex justify-center">
                    <ItemImage
                      item={item}
                      getImageUrl={getImageUrl}
                      imageClassName={imageClassName}
                      fallbackClassName={fallbackClassName}
                    />
                  </div>
                )}
                <ConfirmationMessage message={confirmationMessage} centerText={centerText} />
                <ActionButtons
                  item={item}
                  isDeleting={isDeleting}
                  onDelete={onDelete}
                  onClose={onClose}
                />
                <ErrorMessage error={deletionError} />
                <SuccessMessage
                  success={deletionSuccess}
                  item={item}
                  itemName={itemName}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default GenericDeleteModal;
