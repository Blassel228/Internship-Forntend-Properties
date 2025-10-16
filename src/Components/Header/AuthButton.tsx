import React from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "success" | "danger" | "secondary";

const variantStyles: Record<Variant, string> = {
  primary: "bg-blue-500 hover:bg-blue-600",
  success: "bg-green-500 hover:bg-green-600",
  danger: "bg-red-500 hover:bg-red-600 text-white",
  secondary: "bg-orange-500 hover:bg-orange-600 text-white",
};

type AuthButtonProps = {
  to: string;
  variant?: Variant;
  onClick?: () => void;
  children: React.ReactNode;
};

const AuthButton = ({
  to,
  variant = "primary",
  onClick,
  children,
  className,
}: AuthButtonProps) => {
  return (
    <Link
      to={to}
      className={`${variantStyles[variant]}   text-white px-4 py-2 rounded-full transition-colors text-center flex items-center justify-center space-x-2 ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default AuthButton;
