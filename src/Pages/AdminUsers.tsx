import { useState } from "react";
import Column from "../Components/Ui/Column.tsx";
import Row from "../Components/Ui/Row.tsx";
import DataTable from "../Components/Table/DataTable.tsx";
import * as Avatar from "@radix-ui/react-avatar";
import useUsers from "../Hooks/useUsers.tsx";
import { User } from "../Types/User";
import { UserEditModal } from "../Feature/AdminUsers/UserEditModal.tsx";
import { UserDeleteModal } from "../Feature/AdminUsers/UserDeleteModal.tsx";

const AdminUsers = () => {
  const { users, areUsersLoading, error } = useUsers();
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
          {user.image?.image_data ? (
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
  const widths = ["9%", "15%", "15%", "15%", "15%", "15%", "15%", "10%", "10%"];
  const actionsWidth = "15%";

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
