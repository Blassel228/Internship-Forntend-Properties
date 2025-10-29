import React from "react";

interface TableHeaderCellProps {
  children: React.ReactNode;
  width?: string;
}

function TableHeaderCell({ children, width }: TableHeaderCellProps) {
  return (
    <th
      className="p-3 text-center align-middle"
      style={{ width, height: "50px" }}
    >
      {children}
    </th>
  );
}

export default TableHeaderCell;
