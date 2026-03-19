import React from "react";

interface EditInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const EditInput = React.forwardRef<HTMLInputElement, EditInputProps>(
  ({ error, className, ...rest }, ref) => {
    const classes = `w-full border rounded px-3 py-1 h-8 text-sm focus:outline-none focus:ring-1 ${
      error
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-blue-500"
    } ${className || ""}`;

    return <input className={classes} autoFocus ref={ref} {...rest} />;
  },
);

EditInput.displayName = "EditInput";

export default EditInput;
