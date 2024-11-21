import axios from "axios";
const backend = import.meta.env.VITE_BACKEND;

const token = localStorage.getItem("Authorization")

export async function fetchHalls(pageno, itemsperpage, searchText) {
  try {
    if(!token)
    {
      alert("not logged in")
    }
    const response = await axios.get(
      `${backend}/api/halls/${pageno}/${itemsperpage}?search=${searchText}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching halls:", error);
    throw error;
  }
}

export async function createHall(name) {
  try {
    if(!token)
      {
        alert("not logged in")
      }
    const response = await axios.post(
      `${backend}/api/halls`,
      { name }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating hall:", error);
    throw error;
  }
}

export async function fetchBookings(hallId) {
  try {
    if(!token)
      {
        alert("not logged in")
      }
    const response = await axios.get(`${backend}/api/bookings/${hallId}`,);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
}

export async function createBooking(hallId, date, user) {
  try {
    if(!token)
      {
        alert("not logged in")
      }
    const response = await axios.post(
      `${backend}/api/bookings`,
      { hallId, date, user }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

export async function handleRegister(username, password) {
  try {
    const response = await axios.post(`${backend}/api/auth/register`, {
      username,
      password,
    }); // Allows cookies to be sent and set
    localStorage.setItem(
      "Authorization",
      response.headers.authorization.split(" ")[1]
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

export async function handleLogin(username, password) {
  try {
    const response = await axios.post(`${backend}/api/auth/login`, {
      username,
      password,
    });
    localStorage.setItem(
      "Authorization",
      response.headers.authorization.split(" ")[1]
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

export function handleLogout(){
  localStorage.removeItem( "Authorization")
}