import axios from "axios";
const backend = import.meta.env.VITE_BACKEND;

export async function fetchHalls(pageno, itemsperpage, searchText) {
  try {
    const response = await axios.get(
      `${backend}/api/halls/${pageno}/${itemsperpage}?search=${searchText}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching halls:", error);
    throw error;
  }
}

export async function createHall(name) {
  try {
    const response = await axios.post(
      `${backend}/api/halls`,
      { name },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating hall:", error);
    throw error;
  }
}

export async function fetchBookings(hallId) {
  try {
    const response = await axios.get(`${backend}/api/bookings/${hallId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
}

export async function createBooking(hallId, date, user) {
  try {
    const response = await axios.post(
      `${backend}/api/bookings`,
      { hallId, date, user },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

export async function handleRegister(username, password) {
  try {
    const response = await axios.post(
      `${backend}/api/auth/register`,
      { username, password },
      { withCredentials: true }
    ); // Allows cookies to be sent and set
    response.data.username=username
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

export async function handleLogin(username, password) {
  try {
    const response = await axios.post(
      `${backend}/api/auth/login`,
      { username, password },
      { withCredentials: true }
    ); // Allows cookies to be sent and set
    response.data.username=username
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}
