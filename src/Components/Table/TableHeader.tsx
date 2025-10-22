import React from "react";
import TableHeaderCell from "./TableHeaderCell.tsx";

interface TableHeaderProps {
  headers: string[];
  widths?: string[];
}

export function TableHeader({ headers, widths }: TableHeaderProps) {
  return (
    <thead>
      <tr className="bg-orange-50 text-orange-800 text-sm font-semibold">
        {headers.map((header, index) => (
          <TableHeaderCell key={index} width={widths?.[index]}>
            {header}
          </TableHeaderCell>
        ))}
        <TableHeaderCell width={widths?.[widths?.length - 1] || "160px"}>
          Actions
        </TableHeaderCell>
      </tr>
    </thead>
  );
}

export default TableHeader;
