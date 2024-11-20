import React, { useEffect, useState } from "react";
import { fetchHalls, createHall } from "../services/api";
import PaginationComponent from "./PaginationComponent";

function HallList({ onSelectHall, role }) {
  const [halls, setHalls] = useState([]);
  const [newHall, setNewHall] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    async function loadHalls() {
      const data = await fetchHalls(currentPage, 4, searchText);
      setHalls(data.items);
      setTotalPages(data.totalNoOfPages);
    }
    loadHalls();
  }, [currentPage, refetch]);

  const handleAddHall = async () => {
    if (newHall) {
      const hall = await createHall(newHall);
      setHalls([...halls, hall]);
      setNewHall("");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-sm mx-auto w-full flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-center mb-6">Select a Hall</h2>
      <ul className="space-y-2">
        {halls.map((hall) => (
          <li key={hall._id}>
            <button
              onClick={() => onSelectHall(hall)}
              className="w-full text-left p-3 border rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {hall.name}
            </button>
          </li>
        ))}
      </ul>
      <PaginationComponent
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
      {role === "admin" && (
        <div className="mt-6 flex">
          <input
            type="text"
            value={newHall}
            onChange={(e) => setNewHall(e.target.value)}
            placeholder="Add new hall"
            className="border border-gray-300 p-3 rounded-l-md flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAddHall}
            className="bg-blue-600 text-white p-3 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add
          </button>
        </div>
      )}
      <div className="mt-6 flex">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="search here"
          className="border border-gray-300 p-3 rounded-l-md flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={() => setRefetch(!refetch)}
          className="bg-blue-600 text-white p-3 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          search
        </button>
      </div>
    </div>
  );
}

export default HallList;
