import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import * as Avatar from "@radix-ui/react-avatar";
import { RootState } from "../Types/RootState.tsx";
import { User } from "../Types/User.tsx";
import useUpdateImage from "../Hooks/useUpdateImage.tsx";
import useCreateImage from "../Hooks/useCreateImage.tsx";
import useDeleteImage from "../Hooks/useDeleteImage.tsx";
import { stringToColor } from "../Utils/helpers.tsx";

interface AvatarUploadModalProps {
  trigger: React.ReactNode;
  image?: string | null;
}

export default function AvatarUploadModal({
  image,
  trigger,
}: AvatarUploadModalProps) {
  const user = useSelector(
    (root: RootState) => root.authorizedUser.authorizedUser,
  ) as User | null;

  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: updateImage, isPending: isImageUpdating } = useUpdateImage();
  const { mutate: createImage, isPending: isImageCreating } = useCreateImage();
  const { mutate: deleteImage, isPending: isDeleting } = useDeleteImage();

  const mutate = user?.image?.image_data ? updateImage : createImage;
  const isImageChanging = isImageUpdating || isImageCreating || isDeleting;

  const bgColor = user?.username ? stringToColor(user.username) : "#ccc";
  const initial = user?.username?.charAt(0).toUpperCase() || "?";
  const currentAvatarUrl = image
    ? `data:image/jpeg;base64,${image}`
    : undefined;
  const displayUrl = preview || currentAvatarUrl;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setSelectedFile(file);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!selectedFile) return;

    mutate(selectedFile, {
      onSuccess: () => {
        setPreview(null);
        setSelectedFile(null);
        setOpen(false);
      },
      onError: () => {
        alert("Failed to upload avatar. Please try again.");
      },
    });
  };

  const handleDelete = () => {
    if (!user?.image?.image_data) return;
    if (confirm("Are you sure you want to delete your avatar?")) {
      deleteImage(undefined, {
        onSuccess: () => {
          setPreview(null);
          setSelectedFile(null);
          setOpen(false);
        },
      });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setPreview(null);
          setSelectedFile(null);
        }
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        className={`
          fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          w-full max-w-md bg-white rounded-xl shadow-2xl p-6
          flex flex-col items-center
          z-999 outline-none
          max-h-[90vh] overflow-y-auto
        `}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Upload Profile Photo
        </h3>

        <div
          className={`
            w-32 h-32 rounded-full overflow-hidden
            border-4 border-orange-100 mb-6
            flex items-center justify-center
            bg-gray-50
          `}
        >
          <Avatar.Root className="w-full h-full">
            {displayUrl ? (
              <Avatar.Image
                src={displayUrl}
                alt="Avatar preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <Avatar.Fallback
                className="w-full h-full flex items-center justify-center text-white font-medium text-xl"
                style={{ backgroundColor: bgColor }}
              >
                {initial}
              </Avatar.Fallback>
            )}
          </Avatar.Root>
        </div>

        <button
          type="button"
          onClick={handleUploadClick}
          className={`
            w-full py-3 px-4 mb-4
            bg-orange-500 hover:bg-orange-600
            text-white font-medium rounded-lg
            transition-colors duration-200 cursor-pointer
          `}
          disabled={isImageChanging}
        >
          {isImageChanging ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              Uploading...
            </>
          ) : (
            <>📷 Upload Photo</>
          )}
        </button>

        {user?.image?.image_data && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className={`
              w-full py-3 px-4 mb-4
              bg-red-500 hover:bg-red-600 disabled:bg-red-300
              text-white font-medium rounded-lg
              transition-colors duration-200
            `}
          >
            {isDeleting ? "Deleting..." : "🗑️ Delete Avatar"}
          </button>
        )}

        <button
          type="button"
          onClick={handleSave}
          disabled={!selectedFile || isImageChanging}
          className={`
            w-full py-3 px-4 mb-4
            bg-orange-600 hover:bg-orange-700
            disabled:bg-gray-300 disabled:cursor-not-allowed
            text-white font-medium rounded-lg
            transition-colors duration-200
          `}
        >
          Save Photo
        </button>

        <DialogClose asChild>
          <button
            className={`
              w-full py-2 px-4
              bg-gray-200 hover:bg-gray-300
              text-gray-700 font-medium rounded-lg
              transition-colors duration-200
            `}
          >
            Close
          </button>
        </DialogClose>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
      </DialogContent>
    </Dialog>
  );
}