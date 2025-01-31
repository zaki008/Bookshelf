interface IProps {
  page: number;
  total_page: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, total_page, onPageChange }: IProps) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= total_page) {
      onPageChange(newPage);
    }
  };

  return (
    <nav aria-label="Page navigation example ">
      <ul className="inline-flex -space-x-px text-sm mt-3 md:mt-0 ">
        <li>
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-e-0 rounded-s-lg ${
              page === 1
                ? "text-gray-300 bg-gray-100 cursor-not-allowed"
                : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            Previous
          </button>
        </li>
        {[...Array(total_page)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <li key={pageNumber}>
              <button
                onClick={() => handlePageChange(pageNumber)}
                className={`flex items-center justify-center px-3 h-8 leading-tight border ${
                  page === pageNumber
                    ? "text-blue-600 border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                    : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}
        <li>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === total_page}
            className={`flex items-center justify-center px-3 h-8 leading-tight border rounded-e-lg ${
              page === total_page
                ? "text-gray-300 bg-gray-100 cursor-not-allowed"
                : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
