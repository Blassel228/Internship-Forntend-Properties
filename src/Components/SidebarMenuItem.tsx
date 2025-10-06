import React from "react";
import useNavigation from "../Utils/navigate.tsx";
import { ThemeProvider } from "@material-tailwind/react";
import children = ThemeProvider.propTypes.children;
import routers from "../Constants/routers.tsx";

interface SidebarMenuItemProps {
  sectionName: string;
  count: number;
  isSelected: string;
  onClick: () => void;
}

const SidebarMenuItemText = ({ children }) => {
  return <p className="font-bold text-blue-500">{children}</p>;
};

const SidebarMenuItem = ({
  sectionName,
  count,
  isSelected,
  onClick,
}: SidebarMenuItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`border-t border-gray-300 w-full flex justify-between p-4 cursor-pointer ${isSelected && "border-l-blue-500 border-l-2"}`}
    >
      <div>
        <SidebarMenuItemText>{sectionName}</SidebarMenuItemText>
      </div>
      <div>
        <SidebarMenuItemText>{count}</SidebarMenuItemText>
      </div>
    </div>
  );
};

export default SidebarMenuItem;
