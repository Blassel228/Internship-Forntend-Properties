import React from "react";
import TableRow from "./TableRow.tsx";
import TableColumn from "../../Types/Table.tsx";

interface TableBodyProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  widths?: string[];
  actionsWidth?: string;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  renderActions?: (item: T) => React.ReactNode;
}

export function TableBody<T>({
  data,
  columns,
  widths,
  actionsWidth,
  onEdit,
  onDelete,
  renderActions,
}: TableBodyProps<T>) {
  return (
    <tbody>
      {data.map((item, rowIndex) => (
        <TableRow
          key={rowIndex}
          item={item}
          columns={columns}
          widths={widths}
          actionsWidth={actionsWidth}
          onEdit={onEdit}
          onDelete={onDelete}
          renderActions={renderActions}
        />
      ))}
    </tbody>
  );
}

export default TableBody;
