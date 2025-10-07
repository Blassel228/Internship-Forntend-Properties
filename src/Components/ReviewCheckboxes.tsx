const ReviewCheckboxes = ({ register }: any) => (
  <div className="space-y-4 mb-6">
    <div className="flex items-start">
      <input
        id="recommend"
        type="checkbox"
        {...register("recommend")}
        className="mt-1 h-4 w-4 text-orange-600 cursor-pointer rounded focus:ring-orange-500"
      />
      <label htmlFor="recommend" className="ml-3 text-sm text-gray-700 cursor-pointer">
        Would you recommend this property to a friend?
      </label>
    </div>

    <div className="flex items-start">
      <input
        id="returnAgain"
        type="checkbox"
        {...register("returnAgain")}
        className="mt-1 h-4 w-4 text-orange-600 cursor-pointer rounded focus:ring-orange-500"
      />
      <label htmlFor="returnAgain" className="ml-3 text-sm text-gray-700 cursor-pointer">
        Would you stay here again?
      </label>
    </div>
  </div>
);

export default ReviewCheckboxes;
