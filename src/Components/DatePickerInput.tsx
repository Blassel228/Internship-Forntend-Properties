import React from 'react';

const DatePickerInput = ({ label, value, onChange, placeholder, min }) => {
  return (
    <div className="flex flex-col w-full md:w-1/3">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="date"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        className="px-4 py-2 rounded-md bg-white text-gray-900 border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 w-full"
      />
    </div>
  );
};

export default DatePickerInput;