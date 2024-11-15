
import express from "express";
const hallRoutes = express.Router();
import Hall from "../models/Hall.js"
import Booking from "../models/Booking.js"
import protect from "../middleware/authenticate.js";
import connectDB from "../utils/connectDB.js";
import authorize from "../middleware/authorize.js";

// Get all halls with populated bookings
hallRoutes.get("/halls", async (req, res) => {
  try {
    const halls = await Hall.find().populate({
      path: "bookings",
      populate: { path: "hallId", select: "name" },
    });
    res.json(halls);
  } catch (error) {
    console.error("Error fetching halls:", error);
    res.status(500).json({ error: "Failed to fetch halls" });
  }
});

// Get bookings for a specific hall
hallRoutes.get("/bookings/:hallId", async (req, res) => {
  try {
    const bookings = await Booking.find({ hallId: req.params.hallId });
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});
// Create a new hall
hallRoutes.post("/halls",protect, async (req, res) => {
  const { name } = req.body;

  try {
    // // Create a new hall document
    const newHall = new Hall({ name, bookings: [] });
    await newHall.save();

    res.status(201).json(newHall);
  } catch (error) {
    console.error("Error creating hall:", error);
    res.status(500).json({ error: "Failed to create hall" });
  }
});

// Create a new booking and add it to the hall's booking list
hallRoutes.post("/bookings", protect,authorize("admin","user"), async (req, res) => {
  const { hallId, date, user } = req.body;
  try {
    const booking = new Booking({ hallId, date, user });
    await booking.save();

    // Update the hall to include this new booking
    await Hall.findByIdAndUpdate(hallId, { $push: { bookings: booking._id } });

    res.json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
});


export default hallRoutes