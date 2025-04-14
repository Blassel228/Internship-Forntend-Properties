import React from "react";

const Input = React.forwardRef<HTMLInputElement, any>((props, ref) => {
  return (
    <input
      ref={ref}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
