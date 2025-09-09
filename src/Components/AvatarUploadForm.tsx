import { useState, useRef } from "react";
import {useDispatch, useSelector} from "react-redux";
import useUpdateUser from "../Hooks/useUpdateUser.tsx";
import { setAuthorizedUser } from "../Store/slices/authorizedUserSlice.tsx";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import * as Avatar from "@radix-ui/react-avatar";
import stringToColor from "../Utils/stringToColor.tsx";
import {RootState} from "../Types/RootState.tsx";
import {UserGet} from "../Types/User.tsx";
import useNavigation from "../Utils/navigate.tsx";

interface AvatarUploadModalProps {
  trigger: React.ReactNode;
  image: string;
}

export default function AvatarUploadModal({
  image,
  trigger,
}: AvatarUploadModalProps) {
  const { goTo } = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector((root: RootState) => root.authorizedUser.authorizedUser) as UserGet | null;

  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: updateUser, isPending } = useUpdateUser();

  const bgColor = stringToColor(user?.username);
  const initial = user?.username.charAt(0).toUpperCase();
  const currentAvatarUrl = image
    ? `image/jpeg;base64,${image}`
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

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    updateUser(formData, {
      onSuccess: (updatedUser) => {
        dispatch(setAuthorizedUser(updatedUser));
        setPreview(null);
        setSelectedFile(null);
      },
      onError: () => {
        alert("Failed to upload avatar. Please try again.");
      },
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={`
          fixed inset-0 flex items-center justify-center
          bg-black bg-opacity-50 p-4
          z-50 outline-none
        `}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div
          className={`
            w-full max-w-md bg-white rounded-xl shadow-2xl p-6
            flex flex-col items-center
            relative
          `}
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
              transition-colors duration-200
              flex items-center justify-center gap-2
            `}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Uploading...
              </>
            ) : (
              <>
                📷 Upload Photo
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={!selectedFile || isPending}
            className={`
              w-full py-3 px-4
              bg-orange-600 hover:bg-orange-700
              disabled:bg-gray-300 disabled:cursor-not-allowed
              text-white font-medium rounded-lg
              transition-colors duration-200
            `}
          >
            Save Photo
          </button>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />

          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
            onClick={() => {
              setPreview(null);
              setSelectedFile(null);
            }}
          >
            ✕
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
