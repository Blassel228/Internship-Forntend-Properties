import React from "react";

interface TableCellProps {
  children: React.ReactNode;
  width?: string;
}

function TableCell({ children, width }: TableCellProps) {
  return (
    <td className="p-2 text-xs text-center" style={{ width, height: "90px" }}>
      {children}
    </td>
  );
}

export default TableCell;
