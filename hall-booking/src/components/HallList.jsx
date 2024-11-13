import React, { useEffect, useState } from 'react';
import { fetchHalls, createHall } from '../services/api';

function HallList({ onSelectHall }) {
  const [halls, setHalls] = useState([]);
  const [newHall, setNewHall] = useState('');

  useEffect(() => {
    async function loadHalls() {
      const data = await fetchHalls();
      setHalls(data);
    }
    loadHalls();
  }, []);

  const handleAddHall = async () => {
    if (newHall) {
      const hall = await createHall(newHall);
      setHalls([...halls, hall]);
      setNewHall('');
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Select a Hall</h2>
      <ul className="space-y-2">
        {halls.map((hall) => (
          <li key={hall._id}>
            <button
              onClick={() => onSelectHall(hall)}
              className="w-full text-left p-2 border rounded hover:bg-gray-200"
            >
              {hall.name}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex">
        <input
          type="text"
          value={newHall}
          onChange={(e) => setNewHall(e.target.value)}
          placeholder="Add new hall"
          className="border p-2 flex-1 rounded-l"
        />
        <button
          onClick={handleAddHall}
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default HallList;
