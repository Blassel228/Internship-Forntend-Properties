import React from "react";

const DateInput = React.forwardRef<HTMLInputElement, any>((props) =>  {
  return (
    <input
      {...props}
      className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
    />
  );
}
);

export default DateInput;