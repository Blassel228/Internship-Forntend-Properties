import React from "react";

interface TableContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function TableContainer({
  children,
  className = "",
  ...props
}: TableContainerProps) {
  return (
    <div
      className={`border border-orange-200 bg-white rounded-lg mb-4 ${className}`}
      {...props}
    >
      <table className="w-full min-w-full table-fixed">{children}</table>
    </div>
  );
}

export default TableContainer;
