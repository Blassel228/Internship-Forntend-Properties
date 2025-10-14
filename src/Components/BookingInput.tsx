import React from "react";

const BookingInput = React.forwardRef(
  ({ defaultValue, type, placeholder, id,  ...props }, ref) => {
    return (
      <input
        defaultValue={defaultValue || ""}
        className="border border-gray-300 py-2 px-3 rounded pl-2 w-full"
        type={type}
        id={id}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    );
  }
);

export default BookingInput;
