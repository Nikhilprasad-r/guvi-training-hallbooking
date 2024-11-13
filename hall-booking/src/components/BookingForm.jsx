import React, { useState } from 'react';
import { createBooking } from '../services/api';

function BookingForm({ hall, date }) {
  const [user, setUser] = useState({ name: '', phone: '' });

  const handleBooking = async () => {
    await createBooking(hall._id, date, user);
    alert('Booking successful!');
    setUser({ name: '', phone: '' });
  };

  return (
    <div className="p-4 border rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Book Hall on {date?.toDateString()}</h2>
      <input
        type="text"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        placeholder="Name"
        className="border p-2 mb-2 w-full rounded"
      />
      <input
        type="tel"
        value={user.phone}
        onChange={(e) => setUser({ ...user, phone: e.target.value })}
        placeholder="Phone"
        className="border p-2 mb-2 w-full rounded"
      />
      <button
        onClick={handleBooking}
        className="bg-blue-500 text-white p-2 rounded w-full"
        disabled={!user.name || !user.phone}
      >
        Confirm Booking
      </button>
    </div>
  );
}

export default BookingForm;
