import  { useState } from 'react';
import HallList from './components/HallList';
import DatePicker from './components/DatePicker';
import BookingForm from './components/BookingForm';

function App() {
  const [selectedHall, setSelectedHall] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
console.log(import.meta.env.VITE_BACKEND)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hall Booking System</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <HallList onSelectHall={setSelectedHall} />
        {selectedHall && (
          <DatePicker hall={selectedHall} onDateSelect={setSelectedDate} />
        )}
        {selectedHall && selectedDate && (
          <BookingForm hall={selectedHall} date={selectedDate} />
        )}
      </div>
    </div>
  );
}

export default App;
