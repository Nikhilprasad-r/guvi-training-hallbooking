const PaginationComponent = ({ currentPage, setCurrentPage, totalPages }) => {
  const pages = totalPages > 5 ? 5 : totalPages;
  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
          >
            Previous
          </button>
        </li>
        {Array.from({ length: pages }).map((_, index) => (
          <li key={index}>
            <button
              onClick={() => {setCurrentPage(index+1);}}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 ${
                index+1 === currentPage ? "bg-white" : "bg-slate-500"
              } border border-gray-300 hover:bg-gray-100 hover:text-gray-700 `}
            >
              {index+1}
            </button>
          </li>
        ))}

        <li>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationComponent;
