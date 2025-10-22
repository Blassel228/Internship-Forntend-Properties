import React from "react";

interface TableCellProps {
  children: React.ReactNode;
  width?: string;
}

function TableCell({ children, width }: TableCellProps) {
  return (
    <td className="p-3 align-middle" style={{ width, height: "50px" }}>
      {children}
    </td>
  );
}

export default TableCell;
