import React from "react";
import TableContainer from "./TableContainer.tsx";
import TableHeader from "./TableHeader.tsx";
import TableBody from "./TableBody.tsx";
import TableColumn from "../../Types/Table.tsx";

interface DataTableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  data: T[];
  columns: TableColumn<T>[];
  headers: string[];
  widths?: string[];
  isLoading?: boolean;
  isError?: boolean;
  error?: unknown;
  emptyMessage?: string;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

function DataTable<T>({
  data,
  columns,
  headers,
  widths,
  isLoading = false,
  isError = false,
  error,
  emptyMessage = "No data found",
  className,
  onEdit,
  onDelete,
  ...props
}: DataTableProps<T>) {
  if (isError) {
    return (
      <div className="flex items-center justify-center p-8 border border-orange-200 rounded-lg mb-4">
        <div className="text-center">
          <h3 className="mt-4 text-lg font-medium text-red-700">
            Couldn't load data.
          </h3>
          <p className="text-red-500 mt-2">
            {error?.toString() || "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12 border border-orange-200 rounded-lg mb-4">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center p-12 border border-orange-200 rounded-lg mb-4">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <TableContainer className={className} {...props}>
      <TableHeader headers={headers} widths={widths} />
      <TableBody
        data={data}
        columns={columns}
        widths={widths}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </TableContainer>
  );
}

export default DataTable;
