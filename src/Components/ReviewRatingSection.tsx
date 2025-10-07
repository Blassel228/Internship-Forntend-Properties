const ReviewRatingSection = ({ watch, handleRate, errors }: any) => (
  <div className="mb-8">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Overall rating
    </label>
    <div className="flex justify-between text-xs text-gray-500 mb-1">
      <span>Not good</span>
      <span>Outstanding</span>
    </div>
    <div className="flex border rounded-lg overflow-hidden">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          type="button"
          onClick={() => handleRate(num)}
          className={`flex-1 py-3 text-center border-r last:border-r-0 text-sm transition-colors ${
            watch("rating") === num
              ? "bg-orange-500 text-white font-medium"
              : "text-gray-700 hover:bg-orange-50"
          }`}
        >
          {num}
        </button>
      ))}
    </div>
    {errors.rating && (
      <p className="mt-1 text-sm text-red-600">
        Please select an overall rating.
      </p>
    )}
  </div>
);

export default ReviewRatingSection;
