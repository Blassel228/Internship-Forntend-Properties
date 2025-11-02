const AdminRoomFilterInput = ({ placeholder, className, ...props }) => {
  return (
    <input
      placeholder={placeholder}
      className={`${className} w-full h-12 px-4 rounded-2xl border border-orange-300 bg-white placeholder-orange-300 text-gray-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:ring-opacity-50`}
      {...props}
    />
  );
};

export default AdminRoomFilterInput;
