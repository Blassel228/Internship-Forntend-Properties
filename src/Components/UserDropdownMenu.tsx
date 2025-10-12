import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {Calendar, LogOut, MessageSquare, Settings} from "lucide-react";
import {useEffect} from "react";
import useNavigation from "../Utils/navigate.tsx";
import routers from "../Constants/routers.tsx";
import useAuth from "../Hooks/useAuth.tsx";

interface UserDropdownMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const UserDropdownMenu = ({
  open,
  setOpen,
  children,
}: UserDropdownMenuProps) => {
  const { goTo } = useNavigation();
  const { logout } = useAuth();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "";
    }
  }, [open]);
  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-1 animate-fadeIn origin-top-right z-100"
          sideOffset={8}
          align="end"
          side="bottom"
        >
          <DropdownMenu.Item
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded-md hover:bg-gray-100 focus:bg-gray-100 outline-none cursor-pointer transition"
            onSelect={(e) => {
              e.preventDefault();
              goTo(routers.myBookings);
            }}
          >
            <Calendar size={16} />
            Bookings
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded-md hover:bg-gray-100 focus:bg-gray-100 outline-none cursor-pointer transition"
            onSelect={(e) => {
              e.preventDefault();
              goTo(routers.reviews);
            }}
          >
            <MessageSquare size={16} />
            Reviews
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded-md hover:bg-gray-100 focus:bg-gray-100 outline-none cursor-pointer transition"
            onSelect={(e) => {
              e.preventDefault();
              goTo(routers.personalData);
            }}
          >
            <Settings size={16} />
            Settings
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />

          <DropdownMenu.Item
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 rounded-md hover:bg-red-50 focus:bg-red-50 outline-none cursor-pointer transition"
            onSelect={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            <LogOut size={16} />
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UserDropdownMenu;
