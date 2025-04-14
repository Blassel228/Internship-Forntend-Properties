import React from "react";

const Payment = () => {
  return (
    <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
      <span className="text-orange-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8"
        >
          <path d="M3 11l9-7 9 7v8"></path>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="9" y1="6" x2="15" y2="6"></line>
          <line x1="5" y1="10" x2="19" y2="10"></line>
        </svg>
      </span>
      <div>
        <h3 className="text-2xl">Payment</h3>
        <p className="text-gray-600">Payment Process</p>
      </div>
    </div>
  );
};

export default Payment;
