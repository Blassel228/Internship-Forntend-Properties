import React from "react";
import TableHeaderCell from "./TableHeaderCell.tsx";

interface TableHeaderProps {
  headers: string[];
  widths?: string[];
  actionsWidth?: string;
}

export function TableHeader({
  headers,
  widths,
  actionsWidth,
}: TableHeaderProps & { actionsWidth?: string }) {
  return (
    <thead>
      <tr className="bg-orange-50 text-orange-800 text-sm font-semibold">
        {headers.map((header, index) => (
          <TableHeaderCell key={index} width={widths?.[index]}>
            {header}
          </TableHeaderCell>
        ))}
        <TableHeaderCell
          width={actionsWidth || widths?.[widths?.length - 1] || "160px"}
        >
          Actions
        </TableHeaderCell>
      </tr>
    </thead>
  );
}

export default TableHeader;
