import { useState } from "react";
import BookingForm from "./BookingForm";
import DatePicker from "./DatePicker";
import HallList from "./HallList";
function Dashboard() {
  const [selectedHall, setSelectedHall] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Hall Booking System</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <HallList onSelectHall={setSelectedHall} />
        {selectedHall && (
          <DatePicker hall={selectedHall} onDateSelect={setSelectedDate} />
        )} 
        {selectedHall && selectedDate && ( 
          <BookingForm hall={selectedHall} date={selectedDate} onSelectHall={setSelectedHall} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
