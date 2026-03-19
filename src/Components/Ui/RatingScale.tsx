import React from "react";

interface RatingScaleProps {
  question: string;
  min?: number;
  max?: number;
  onRate?: (value: number) => void;
  value?: number;
}

const RatingScale = ({
  question,
  min = 1,
  max = 10,
  onRate,
  value,
}: RatingScaleProps) => {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <div className="bg-white w-full p-4 rounded">
      <h3 className="font-bold mb-2">Rate this property:</h3>
      <p className="mb-4">{question}</p>

      <div className="flex border rounded overflow-hidden w-full">
        {numbers.map((num) => (
          <button
            key={num}
            onClick={() => onRate?.(num)}
            className={`flex-1 py-2 text-center border-r last:border-r-0 transition-colors duration-200 cursor-pointer
              ${
                value === num
                  ? "bg-orange-500 text-white font-medium"
                  : "hover:bg-orange-100 text-gray-700"
              }`}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>Bad</span>
        <span>Exceptional</span>
      </div>
    </div>
  );
};

export default RatingScale;
