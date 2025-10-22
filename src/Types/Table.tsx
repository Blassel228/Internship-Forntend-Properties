import React from "react";

interface TableColumn<T> {
  accessorKey?: keyof T;
  cell?: (
    item: T,
    onEdit?: (item: T) => void,
    onDelete?: (item: T) => void,
  ) => React.ReactNode;
}

export default TableColumn;
