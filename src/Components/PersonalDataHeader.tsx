import Row from "./Row.tsx";
import AvatarUploadModal from "./AvatarUploadForm.tsx";
import * as Avatar from "@radix-ui/react-avatar";
import { stringToColor } from "../Utils/helpers.tsx";

export default function PersonalDataHeader({
  username,
  image_data,
}: {
  username: string;
  image_data?: string | null;
}) {
  const bgColor = stringToColor(username);
  const avatarUrl = image_data
    ? `data:image/jpeg;base64,${image_data}`
    : undefined;

  return (
    <Row className="flex user-setting mb-6 justify-between w-full items-center">
      <div>
        <h1 className="text-2xl font-bold">Personal Data</h1>
        <p className="text-gray-600 mt-2">
          You can see and renew your personal data here.
        </p>
      </div>

      <AvatarUploadModal
        currentAvatarBase64={image_data || null}
        image={image_data}
        trigger={
          <Avatar.Root className="w-20 h-20 rounded-full overflow-hidden cursor-pointer border-2 border-gray-200 hover:border-orange-300 transition-colors">
            {avatarUrl ? (
              <Avatar.Image
                src={avatarUrl}
                alt={username}
                className="w-full h-full object-cover"
              />
            ) : (
              <Avatar.Fallback
                className="w-full h-full flex items-center justify-center text-white text-lg font-medium"
                style={{ backgroundColor: bgColor }}
              >
                {username?.charAt(0).toUpperCase() || "?"}
              </Avatar.Fallback>
            )}
          </Avatar.Root>
        }
      />
    </Row>
  );
}
