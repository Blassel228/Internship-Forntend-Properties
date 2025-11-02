const ReviewCategory = ({
  label,
  options,
  currentValue,
  setValue,
  name,
  error,
}: any) => (
  <div className="mb-8">
    <h3 className="font-medium text-gray-800 mb-3">{label}</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((opt: any) => (
        <button
          key={opt.value}
          type="button"
          onClick={() =>
            setValue(name, opt.value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          className={`p-4 text-left rounded-lg border cursor-pointer transition-all ${
            currentValue === opt.value
              ? "border-orange-500 bg-orange-50 ring-2 ring-orange-100"
              : "border-gray-200 hover:bg-gray-50"
          }`}
        >
          <div className="flex items-start">
            <span className="text-2xl mr-3">{opt.emoji}</span>
            <div>
              <div className="font-medium text-gray-800">{opt.label}</div>
              <div className="text-sm text-gray-600 mt-1">{opt.desc}</div>
            </div>
          </div>
        </button>
      ))}
    </div>
    {error && (
      <p className="mt-2 text-sm text-red-600">Please make a selection.</p>
    )}
  </div>
);

export default ReviewCategory;
