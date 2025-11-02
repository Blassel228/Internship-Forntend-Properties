const ReviewImage = ({ image }: { image?: string }) => (
  <div className="h-64 w-full">
    {image ? (
      <img alt="Room" className="w-full h-full object-cover" src={image} />
    ) : (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
        No image available
      </div>
    )}
  </div>
);

export default ReviewImage;
