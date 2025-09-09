import Row from "./Row.tsx";
import stringToColor from "../Utils/stringToColor.tsx";
import AvatarUploadModal from "./AvatarUploadForm.tsx";
import useNavigation from "../Utils/navigate.tsx";

export default function PersonalDataHeader({
  username,
  image,
  userId,
}: {
  username: string;
  image?: string | null;
  userId: string;
}) {
  const bgColor = stringToColor(username);

  return (
    <Row className="flex user-setting mb-6 justify-between w-full items-center">
      <div>
        <h1 className="text-2xl font-bold">Personal Data</h1>
        <p className="text-gray-600 mt-2">
          You can see and renew your personal data here.
        </p>
      </div>

      <AvatarUploadModal
        currentAvatarBase64={image || null}
        image={image}
        userId={userId}
        trigger={
          <div>
            {image ? (
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 hover:border-orange-300 transition-colors">
                <img
                  src={`image/jpeg;base64,${image}`}
                  alt="Current avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-lg font-medium cursor-pointer border-2 border-gray-200 hover:border-orange-300 transition-colors"
                style={{ backgroundColor: bgColor }}
              >
                {username?.charAt(0).toUpperCase() || "?"}
              </div>
            )}
          </div>
        }
      />
    </Row>
  );
}