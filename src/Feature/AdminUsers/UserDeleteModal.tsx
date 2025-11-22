import useDeleteUser from "./useDeleteUser.tsx";
import GenericDeleteModal from "../../Components/Ui/GenericDeleteModal.tsx";
import { User } from "../../Types/User.tsx";

interface UserDeleteModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UserDeleteModal = ({
  user,
  isOpen,
  onClose,
}: UserDeleteModalProps) => {
  const {
    deleteUser,
    isUserDeleting,
    deletionError,
    isSuccess: deletionSuccess,
  } = useDeleteUser();

  return (
    <GenericDeleteModal
      item={user}
      isOpen={isOpen}
      onClose={onClose}
      onDelete={deleteUser}
      isDeleting={isUserDeleting}
      deletionError={deletionError}
      deletionSuccess={deletionSuccess}
      title={(user) => `Delete User: ${user?.username}`}
      getImageUrl={(user) =>
        user?.image.image_data
          ? `data:image/png;base64,${user.image.image_data}`
          : undefined
      }
      itemName={(user) => `User ${user?.username}`}
      confirmationMessage="Are you sure you want to delete this user from the database?"
      showImage={true}
      centerText={false}
      imageClassName="w-32 h-32 object-cover rounded-full"
      dialogClassName="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl"
    />
  );
};
