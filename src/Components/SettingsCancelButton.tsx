import React from "react";

type SettingsCancelButtonProps = {
  onClick: () => void;
};

const SettingsCancelButton: React.FC<SettingsCancelButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-blue-600 w-full font-medium text-sm py-2 px-2 rounded-md transition duration-500 cursor-pointer hover:bg-blue-100"
    >
      {children}
    </button>
  );
};

export default SettingsCancelButton;
