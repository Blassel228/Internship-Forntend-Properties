import { ChangeEvent, useEffect, useState } from "react";
import Column from "../Components/Column.tsx";
import Row from "../Components/Row.tsx";
import DataTable from "../Components/Table/DataTable.tsx";
import * as Avatar from "@radix-ui/react-avatar";
import useGetUsers from "../Hooks/useGetUsers.tsx";
import GenericDeleteModal from "../Components/GenericDeleteModal.tsx";
import useDeleteUser from "../Hooks/useDeleteUser.tsx";
import GenericEditModal from "../Components/GenericEditModal";
import { User, UserUpdate } from "../Types/User";
import { useUpdateUser } from "../Hooks/useUpdateUser.tsx";
import { useForm } from "react-hook-form";

interface UserEditModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserEditModal = ({ user, isOpen, onClose }: UserEditModalProps) => {
  const { updateUser, isUserUpdating } = useUpdateUser();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);

  const { setValue, reset } = useForm<UserUpdate>({
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      name: user?.name || "",
      surname: user?.surname || "",
      is_admin: user?.is_admin || false,
      phone_number: user?.phone_number || "",
      country: user?.country || "",
      sex: user?.sex || 0,
      birthdate: user?.birthdate || "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
        name: user.name,
        surname: user.surname,
        is_admin: user.is_admin,
        phone_number: user.phone_number,
        country: user.country || "",
        sex: user.sex || 0,
        birthdate: user.birthdate || "",
      });

      if (user.image_data) {
        setImagePreview(`data:image/png;base64,${user.image_data}`);
        setImageData(user.image_data);
      } else {
        setImagePreview(null);
        setImageData(null);
      }
    }
  }, [user, reset]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64StringRequest = (reader.result as string).split(",")[1];
      setImagePreview(base64String);
      setImageData(base64StringRequest);
      setValue("image_data", base64StringRequest, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };

  const handleEditSubmit = (data: UserUpdate) => {
    console.log("SUBMITTED: " + JSON.stringify(data));
    if (!user) return;

    const processedData = {
      ...data,
      is_admin: data.is_admin === "true" || data.is_admin === true,
      image_data: imageData || data.image_data,
    };

    updateUser(
      { userId: user.id, updatedData: processedData },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  const editFields = [
    {
      name: "username",
      label: "Username",
      type: "text",
      required: false,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: false,
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      required: false,
    },
    {
      name: "surname",
      label: "Surname",
      type: "text",
      required: false,
    },
    {
      name: "is_admin",
      label: "Is Admin",
      type: "select",
      options: ["true", "false"],
      required: false,
    },
    {
      name: "phone_number",
      label: "Phone Number",
      type: "text",
      required: false,
    },
    {
      name: "country",
      label: "Country",
      type: "text",
      required: false,
    },
    {
      name: "sex",
      label: "Sex",
      type: "select",
      options: ["0", "1", "2"],
      required: false,
    },
    {
      name: "birthdate",
      label: "Birthdate",
      type: "date",
      required: false,
    },
    {
      name: "image-preview",
      label: "Avatar Preview",
      type: "image-preview",
    },
    {
      name: "image_data",
      label: "Upload Avatar",
      type: "file",
    },
  ];

  return (
    <GenericEditModal
      item={user}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleEditSubmit}
      isUpdating={isUserUpdating}
      title={(user) => `Edit User: ${user?.username}`}
      fields={editFields}
      imagePreview={imagePreview}
      onFileChange={handleFileChange}
      setValue={setValue}
    />
  );
};

interface UserDeleteModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserDeleteModal = ({ user, isOpen, onClose }: UserDeleteModalProps) => {
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

const AdminUsers = () => {
  const { users, areUsersLoading, error } = useGetUsers();
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const itemsPerPage = 10;

  const totalPages = users ? Math.ceil(users.length / itemsPerPage) : 0;
  const paginatedUsers = users
    ? users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  const openEditModal = (user: User) => setEditingUser(user);
  const closeEditModal = () => setEditingUser(null);

  const openDeleteModal = (user: User) => setDeletingUser(user);
  const closeDeleteModal = () => setDeletingUser(null);

  const columns = [
    {
      header: "Avatar",
      cell: (user: User) => (
        <Avatar.Root className="w-2 h-6 overflow-hidden">
          {user.image.image_data ? (
            <Avatar.Image
              src={`data:image/png;base64,${user.image.image_data}`}
              alt="User avatar"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <Avatar.Fallback className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
              {user.name.charAt(0)}
              {user.surname.charAt(0)}
            </Avatar.Fallback>
          )}
        </Avatar.Root>
      ),
    },
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Username",
      accessorKey: "username",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Surname",
      accessorKey: "surname",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Phone",
      accessorKey: "phone_number",
    },
    {
      header: "Country",
      accessorKey: "country",
    },
    {
      header: "Admin",
      cell: (user: User) => (user.is_admin ? "Yes" : "No"),
    },
  ];

  const headers = columns.map((col) => col.header);
  const widths = ["7%", "15%", "15%", "15%", "15%", "15%", "15%", "13%", "5%"];
  const actionsWidth = "10%";

  return (
    <>
      <Row className="mt-36 justify-center px-16 w-full">
        <Column className="gap-4">
          <DataTable
            data={paginatedUsers}
            columns={columns}
            headers={headers}
            widths={widths}
            actionsWidth={actionsWidth}
            isLoading={areUsersLoading}
            isError={!!error}
            error={error}
            emptyMessage="No users found"
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-orange-500 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-orange-500 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </Column>
      </Row>

      <UserEditModal
        key={editingUser?.id || "new"}
        user={editingUser}
        isOpen={!!editingUser}
        onClose={closeEditModal}
      />

      <UserDeleteModal
        user={deletingUser}
        isOpen={!!deletingUser}
        onClose={closeDeleteModal}
      />
    </>
  );
};

export default AdminUsers;
