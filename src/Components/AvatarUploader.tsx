import {useRef, useState} from "react";
import * as Avatar from "@radix-ui/react-avatar";
import {useSelector} from "react-redux";
import {RootState} from "../Types/RootState.tsx";
import {User} from "../Types/User.tsx";
import {stringToColor} from "../Utils/helpers.tsx";

interface AvatarUploaderProps {
  currentAvatarBase64?: string | null;
  onFileSelect: (file: File | null) => void;
  className?: string;
}

export default function AvatarUploader({
  currentAvatarBase64,
  onFileSelect,
  className = "",
}: AvatarUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const user = useSelector(
    (root: RootState) => root.authorizedUser.authorizedUser,
  ) as User | null;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const bgColor = stringToColor(user?.username);
  const initial = user?.username.charAt(0).toUpperCase();

  const currentAvatarUrl = user?.image_data
    ? `image/jpeg;base64,${currentAvatarBase64}`
    : undefined;

  const displayUrl = preview || currentAvatarUrl;

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

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
    };
    reader.readAsDataURL(file);

    onFileSelect(file);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />

      <div
        onClick={handleButtonClick}
        className={`
          w-16 h-16 rounded-full overflow-hidden
          border-2 border-dashed border-gray-300
          hover:border-blue-500 cursor-pointer
          flex items-center justify-center
          transition-colors duration-200
          bg-white
        `}
        aria-label="Upload avatar"
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
              className="w-full h-full flex items-center justify-center text-white font-medium text-lg"
              style={{ backgroundColor: bgColor }}
            >
              {initial}
            </Avatar.Fallback>
          )}
        </Avatar.Root>
      </div>
    </div>
  );
}
