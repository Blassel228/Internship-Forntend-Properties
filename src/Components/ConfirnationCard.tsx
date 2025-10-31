import React from "react";

const ConfirmationCard = ({ confirmationNumber, onCopy }) => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-5">
      <h3 className="font-semibold text-gray-800 mb-2">Confirmation #</h3>
      <p className="font-mono text-lg bg-white p-2 rounded mb-2">
        {confirmationNumber}
      </p>
      <button
        onClick={onCopy}
        className="text-sm text-blue-600 hover:underline"
      >
        Copy to clipboard
      </button>
    </div>
  );
};

export default ConfirmationCard;
