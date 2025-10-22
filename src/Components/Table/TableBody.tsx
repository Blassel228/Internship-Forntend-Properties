import React from "react";
import TableRow from "./TableRow.tsx";
import TableColumn from "../../Types/Table.tsx";

interface TableBodyProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  widths?: string[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export function TableBody<T>({
  data,
  columns,
  widths,
  onEdit,
  onDelete,
}: TableBodyProps<T>) {
  return (
    <tbody>
      {data.map((item, rowIndex) => (
        <TableRow
          key={rowIndex}
          item={item}
          columns={columns}
          widths={widths}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </tbody>
  );
}

export default TableBody;
