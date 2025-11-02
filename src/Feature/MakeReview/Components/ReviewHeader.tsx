const ReviewHeader = ({ roomType }: { roomType?: string }) => (
  <>
    <h2 className="text-xl font-bold text-gray-800 mb-2">Review your stay</h2>
    <p className="text-gray-600 mb-6">
      How was your stay at{" "}
      <span className="font-medium">{roomType || "this property"}</span>?
    </p>
  </>
);

export default ReviewHeader;
