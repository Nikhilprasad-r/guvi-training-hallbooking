import React from "react";

const BookingDetails = ({ selectedBooking, setSelectedBooking }) => {
  return (
    <div className="mt-4 p-4 border rounded bg-gray-100">
      <h3 className="text-lg font-semibold">Booking Details</h3>
      <p>
        <strong>Date:</strong> {selectedBooking.date}
      </p>
      <p>
        <strong>Name:</strong> {selectedBooking.user.name}
      </p>
      <p>
        <strong>Phone:</strong> {selectedBooking.user.phone}
      </p>
      <button
        onClick={() => setSelectedBooking(null)}
        className="mt-2 bg-blue-500 text-white p-2 rounded"
      >
        Close
      </button>
    </div>
  );
};

export default BookingDetails;
