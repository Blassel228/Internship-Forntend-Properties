import React from "react";

interface SidebarMenuItemProps {
  sectionName: string;
  count: number;
  isSelected: boolean;
  onClick: () => void;
}

const SidebarMenuItem = ({
  sectionName,
  count,
  isSelected,
  onClick,
}: SidebarMenuItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-150 flex justify-between items-center ${
        isSelected
          ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <span>{sectionName}</span>
      <span className={isSelected ? "text-blue-700" : "text-gray-500"}>
        {count}
      </span>
    </button>
  );
};

export default SidebarMenuItem;