import { InputHTMLAttributes } from "react";

interface RoomEditModalFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const RoomEditModalField = ({
  label,
  ...inputProps
}: RoomEditModalFieldProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        {...inputProps}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  );
};

export default RoomEditModalField;
