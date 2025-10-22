import React, { useState } from "react";
import { User } from "../Types/User";
import useGetUsers  from "../Hooks/useGetUsers.tsx";
import DataTable from "../Components/Table/DataTable";
import * as Avatar from "@radix-ui/react-avatar";
import Row from "../Components/Row.tsx";
import TableColumn from "../Types/Table";

function AdminUsers() {
  const {
    users,
    isLoading,
    isError,
    error,
  } = useGetUsers();

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  const openEditModal = (user: User) => setEditingUser(user);
  const closeEditModal = () => setEditingUser(null);

  const openDeleteModal = (user: User) => setDeletingUser(user);
  const closeDeleteModal = () => setDeletingUser(null);

  const columns: TableColumn<User>[] = [
    {
      header: "Avatar",
      cell: (user) => (
        <Avatar.Root className="w-7 h-7 rounded-full overflow-hidden">
          {user.image_data ? (
            <Avatar.Image
              src={`data:image/png;base64,${user.image_data}`}
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <Avatar.Fallback className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
              {user.name.charAt(0)}{user.surname.charAt(0)}
            </Avatar.Fallback>
          )}
        </Avatar.Root>
      ),
    },
    { header: "Username", accessorKey: "username" },
    { header: "Name", accessorKey: "name" },
    { header: "Surname", accessorKey: "surname" },
    { header: "Email", accessorKey: "email" },
    { header: "Phone", accessorKey: "phone_number" },
    { header: "Country", accessorKey: "country" },
    {
      header: "Admin",
      cell: (user) => (user.is_admin ? "Yes" : "No"),
    },
  ];

  const headers = ["Avatar", "Username", "Name", "Surname", "Email", "Phone", "Country", "Admin"];
  const widths = ["10%", "15%", "10%", "30%", "20%", "15%", "5%", "5%"];

  return (
    <div className="p-6 mt-36">
      <Row className="gap-8">
        <div className="w-full">
          <DataTable
            data={users || []}
            columns={columns}
            headers={headers}
            widths={widths}
            isLoading={isLoading}
            isError={isError}
            error={error}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />
        </div>
      </Row>
    </div>
  );
}

export default AdminUsers;
