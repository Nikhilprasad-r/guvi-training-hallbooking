import React, { useState } from 'react';
import { createBooking } from '../services/api';

function BookingForm({ hall, date,onSelectHall }) {
  const [user, setUser] = useState({ name: '', phone: '' });

  const handleBooking = async () => {
    await createBooking(hall._id, date, user);
    alert('Booking successful!');
    setUser({ name: '', phone: '' });
    onSelectHall("")
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Book Hall on {date?.toDateString()}
      </h2>
      <div className="space-y-4">
        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="Name"
          className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="tel"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          placeholder="Phone"
          className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleBooking}
          className="bg-blue-500 text-white p-3 rounded-md w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={!user.name || !user.phone}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

export default BookingForm;
