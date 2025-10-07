const ReviewCommentBox = ({ register }: any) => (
  <div className="mt-6">
    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
      Share your experience (optional)
    </label>
    <textarea
      id="comment"
      {...register("comment")}
      rows={4}
      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
      placeholder="What did you like? What could be improved?"
    />
  </div>
);

export default ReviewCommentBox;
