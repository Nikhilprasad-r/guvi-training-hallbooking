export async function fetchHalls() {
  const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/halls`);
  return response.json();
}

export async function createHall(name) {
  const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/halls`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return response.json();
}

export async function fetchBookings(hallId) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}/api/bookings/${hallId}`
  );
  return response.json();
}

export async function createBooking(hallId, date, user) {
  const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ hallId, date, user }),
  });
  return response.json();
}
