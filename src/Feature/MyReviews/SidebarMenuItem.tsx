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
      className={`w-full text-left px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg transition-colors duration-150 flex justify-between items-center ${
        isSelected
          ? "bg-orange-50 text-orange-700 font-semibold border-l-4 border-orange-600"
          : "text-gray-700 hover:bg-orange-50 hover:text-orange-700"
      }`}
    >
      <span className="text-sm sm:text-base mr-4">{sectionName}</span>
      <span
        className={isSelected ? "text-orange-700 font-medium" : "text-gray-500"}
      >
        {count}
      </span>
    </button>
  );
};

export default SidebarMenuItem;
