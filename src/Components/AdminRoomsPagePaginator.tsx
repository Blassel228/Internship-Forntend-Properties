interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const AdminRoomsPagePaginator = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-6 space-x-2 pb-4">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-orange-100 text-orange-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === i + 1
              ? "bg-orange-500 text-white"
              : "bg-orange-100 text-orange-700 hover:bg-orange-200"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-orange-100 text-orange-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default AdminRoomsPagePaginator;
