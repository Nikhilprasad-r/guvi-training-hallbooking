import { useEffect, useState } from "react";
import { fetchBookings } from "../services/api";

function DatePicker({ hall, onDateSelect, role,setSelectedBooking }) {
  const [bookedDates, setBookedDates] = useState([]);
 
  useEffect(() => {
    setSelectedBooking(null);
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
    role === "admin"
      ? setSelectedBooking(booking)
      : alert("This date is already booked try another hall");
  };

  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  return (
    <div className="p-4 border rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">
        Pick a Date to book {hall.name}
      </h2>
      <div className="grid grid-cols-5 gap-2">
        {dates.map((date) => {
          const booking = bookedDates.find(
            (b) => b.date === date.toDateString()
          );
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
                isBooked
                  ? "bg-red-300 text-gray-500 cursor-pointer"
                  : "hover:bg-gray-200"
              }`}
            >
              {date.toDateString()}
            </button>
          );
        })}
      </div>

    </div>
  );
}

export default DatePicker;
