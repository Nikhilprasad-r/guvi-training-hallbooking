import { useEffect, useState } from 'react';
import { fetchBookings } from '../services/api';

function DatePicker({ hall, onDateSelect }) {
  const [bookedDates, setBookedDates] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null); // Track selected booking

  useEffect(() => {
    async function loadBookings() {
     
      const bookings = await fetchBookings(hall._id);
      const formattedBookings = bookings.map((booking) => ({
        date: new Date(booking.date).toDateString(),
        user: booking.user,
      }));
      setBookedDates(formattedBookings);
    }
    if (hall) loadBookings();
  }, [hall]);

  const handleBookedDateClick = (booking) => {
    setSelectedBooking(booking); 
  };

  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  return (
    <div className="p-4 border rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Pick a Date</h2>
      <div className="grid grid-cols-5 gap-2">
        {dates.map((date) => {
          const booking = bookedDates.find((b) => b.date === date.toDateString());
          const isBooked = !!booking;

          return (
            <button
            key={date}
            onClick={() => {
              if (isBooked) {
                handleBookedDateClick(booking); 
              } else {
                setSelectedBooking(null); 
                onDateSelect(date); 
              }
            }}
            className={`p-2 border rounded ${
              isBooked ? 'bg-red-300 text-gray-500 cursor-pointer' : 'hover:bg-gray-200'
            }`}
          >
            {date.toDateString()}
          </button>
          
          );
        })}
      </div>

      {selectedBooking && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-semibold">Booking Details</h3>
          <p><strong>Date:</strong> {selectedBooking.date}</p>
          <p><strong>Name:</strong> {selectedBooking.user.name}</p>
          <p><strong>Phone:</strong> {selectedBooking.user.phone}</p>
          <button
            onClick={() => setSelectedBooking(null)}
            className="mt-2 bg-blue-500 text-white p-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default DatePicker;
