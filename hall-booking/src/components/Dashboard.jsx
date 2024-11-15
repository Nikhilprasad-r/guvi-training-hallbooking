import { useState } from "react";
import BookingForm from "./BookingForm";
import DatePicker from "./DatePicker";
import HallList from "./HallList";
import BookingDetails from "./BookingDetails";
function Dashboard({ role }) {
  const [selectedHall, setSelectedHall] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null); // Track selected booking

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Hall Booking System</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <HallList onSelectHall={setSelectedHall} role={role} />
        {selectedHall && (
          <DatePicker
            hall={selectedHall}
            onDateSelect={setSelectedDate}
            role={role}
            setSelectedBooking={setSelectedBooking}
          />
        )}
        {selectedHall && selectedDate && !selectedBooking && (
          <BookingForm
            hall={selectedHall}
            date={selectedDate}
            onSelectHall={setSelectedHall}
          />
        )}
        {role === "admin" && selectedBooking && (
          <BookingDetails
            selectedBooking={selectedBooking}
            setSelectedBooking={setSelectedBooking}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
