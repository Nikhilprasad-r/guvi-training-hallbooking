import axios from "axios";
const backend = import.meta.env.VITE_BACKEND;
export async function fetchHalls() {
  const response = await fetch(`${backend}/api/halls`);
  return response.json();
}

export async function createHall(name) {
  const response = await fetch(`${backend}/api/halls`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return response.json();
}

export async function fetchBookings(hallId) {
  const response = await fetch(`${backend}/api/bookings/${hallId}`);
  return response.json();
}

export async function createBooking(hallId, date, user) {
  const response = await fetch(`${backend}/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ hallId, date, user }),
  });
  return response.json();
}
export async function handleRegister(username, password) {
  try {
    const response = await axios.post(`${backend}/api/auth/register`, {
      username,
      password,
    });
    return response.data.message;
  } catch (error) {
    return error.response.data.message || "Error registering user";
  }
}
export async function handleLogin(username, password) {
  try {
    const response = await axios.post(`${backend}/api/auth/login`, {
      username,
      password,
    });
    return response.data.message;
  } catch (error) {
    return error.response.data.message || "Error logging in";
  }
}
