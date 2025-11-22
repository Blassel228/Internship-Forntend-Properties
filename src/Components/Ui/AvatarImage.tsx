import * as Avatar from "@radix-ui/react-avatar";
import React from "react";

interface AvatarImageProps {
  src?: string;
  fallbackText?: string;
  alt?: string;
  className?: string;
  rootClassName?: string;
  imageClassName?: string;
  fallbackClassName?: string;
  bgColor?: string;
  fallbackProps?: React.ComponentProps<typeof Avatar.Fallback>;
  rootProps?: React.ComponentProps<typeof Avatar.Root>;
}

const AvatarImage = ({
  src,
  fallbackText,
  alt = "Avatar",
  rootClassName = "",
  imageClassName = "",
  fallbackClassName = "",
  bgColor,
  fallbackProps = {},
  rootProps = {},
}: AvatarImageProps) => {
  const fallbackContent = fallbackText || alt?.charAt(0)?.toUpperCase() || "?";

  return (
    <Avatar.Root
      className={`inline-block ${rootClassName}`}
      style={bgColor ? { backgroundColor: bgColor } : undefined}
      {...rootProps}
    >
      {src && <Avatar.Image src={src} alt={alt} className={imageClassName} />}
      <Avatar.Fallback
        className={fallbackClassName}
        delayMs={0}
        {...fallbackProps}
      >
        {fallbackContent}
      </Avatar.Fallback>
    </Avatar.Root>
  );
};

export default AvatarImage;
