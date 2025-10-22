import React from "react";
import TableCell from "./TableCell.tsx";
import ActionButtons from "./ActionButtons.tsx";
import TableColumn from "../../Types/Table.tsx";

interface TableRowProps<T> {
  item: T;
  columns: TableColumn<T>[];
  widths?: string[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

function TableRow<T>({
  item,
  columns,
  widths,
  onEdit,
  onDelete,
}: TableRowProps<T>) {
  return (
    <tr className="hover:bg-orange-50">
      {columns.map((column, colIndex) => (
        <TableCell key={colIndex} width={widths?.[colIndex]}>
          {column.cell
            ? column.cell(item, onEdit, onDelete)
            : column.accessorKey
              ? String(item[column.accessorKey])
              : null}
        </TableCell>
      ))}
      <TableCell width={widths?.[widths?.length - 1] || "160px"}>
        <ActionButtons item={item} onEdit={onEdit} onDelete={onDelete} />
      </TableCell>
    </tr>
  );
}

export default TableRow;
