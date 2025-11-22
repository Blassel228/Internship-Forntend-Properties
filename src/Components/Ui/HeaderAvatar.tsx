import { useSelector } from "react-redux";
import { RootState } from "../../Types/RootState.tsx";
import { User } from "../../Types/User.tsx";
import * as Avatar from "@radix-ui/react-avatar";
import { stringToColor } from "../../Utils/helpers.tsx";

interface HeaderAvatarProps {
  className?: string;
  onClick?: () => void;
}

export default function HeaderAvatar({
  className = "",
  onClick = "",
}: HeaderAvatarProps) {
  const user = useSelector(
    (root: RootState) => root.authorizedUser.authorizedUser,
  ) as User | null;

  if (!user || !user.username) return null;

  const initial = user.username?.charAt(0).toUpperCase() || "?";

  const bgColor = stringToColor(user?.username);

  return (
    <div
      onClick={() => onClick()}
      className={`
        inline-flex items-center justify-center
        rounded-full
        w-12 h-12
        cursor-pointer
        transition-all duration-200 hover:scale-105 hover:shadow-md
        ${className}
      `}
      aria-label={`Avatar for ${user.username}`}
    >
      <Avatar.Root className="w-full h-full rounded-full overflow-hidden">
        <Avatar.Image
          src={`data:image/jpeg;base64,${user.image?.image_data}`}
          alt={user.username}
          className="w-full h-full object-cover"
        />
        <Avatar.Fallback
          className="w-full h-full flex items-center justify-center text-white font-medium"
          style={{ backgroundColor: bgColor }}
        >
          {initial}
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}
