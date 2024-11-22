import express from "express";
const hallRoutes = express.Router();
import Hall from "../models/mysql/Hall.js";
import Booking from "../models/mysql/Booking.js";
import protect from "../middleware/authenticate.js";
import authorize from "../middleware/authorize.js";

// Get all halls with populated bookings
hallRoutes.get("/halls/:pageNumber/:itemsPerPage", async (req, res) => {
  try {
    const { search } = req.query;
    const { pageNumber, itemsPerPage } = req.params;
    const page = parseInt(pageNumber) || 1;
    const noOfItems = parseInt(itemsPerPage) || 5;
    const itemsToSkip = (pageNumber - 1) * noOfItems;
    // const query = search ? { name: { $regex: search, $options: "i" } } : {};// string based search no indexing required and partial search can be done
    // const query = search ? { $text: { $search: search } } : {}; //index based search will not work if not indexed
    // const [halls, totalCount] = await Promise.all([
    //   Hall.find(query)
    //     .populate({
    //       path: "bookings",
    //       populate: { path: "hallId", select: "name" },
    //     })
    //     .skip(itemsToSkip)
    //     .limit(noOfItems),
    //   Hall.countDocuments(query),
    // ]);
    const query = search ? { name: { [Op.like]: `%${search}%` } } : {};
    const { rows: halls, count: totalCount } = await Hall.findAndCountAll({
      where: query,
      includes: { model: Booking },
      offset: itemsToSkip,
      limit: noOfItems,
    });

    res.json({
      currentPageNo: page,
      pageSize: noOfItems,
      totalCount: totalCount,
      items: halls,
      totalNoOfPages: Math.ceil(totalCount / noOfItems),
    });
  } catch (error) {
    console.error("Error fetching halls:", error);
    res.status(500).json({ error: "Failed to fetch halls" });
  }
});

// Get bookings for a specific hall
hallRoutes.get("/bookings/:hallId", async (req, res) => {
  try {
    // const bookings = await Booking.find({ hallId: req.params.hallId });

    const bookings = await Booking.findOne({
      where: {
        hallId: req.params.hallId,
      },
    });

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// Create a new hall
hallRoutes.post("/halls", async (req, res) => {
  const { name } = req.body;

  try {
    // // Create a new hall document
    // const newHall = new Hall({ name, bookings: [] });
    const newHall = await Hall.create({name})
    await newHall.save();

    res.status(201).json(newHall);
  } catch (error) {
    console.error("Error creating hall:", error);
    res.status(500).json({ error: "Failed to create hall" });
  }
});

// Create a new booking and add it to the hall's booking list
hallRoutes.post(
  "/bookings",
  protect,
  authorize("admin", "user"),
  async (req, res) => {
    const { hallId, date, user } = req.body;
    try {
      // const booking = new Booking({ hallId, date, user });
      // await booking.save();

      // Update the hall to include this new booking
      // await Hall.findByIdAndUpdate(hallId, {
      //   $push: { bookings: booking._id },
      // });

      const booking = await Booking.create({ hallId, date, user });

      res.json(booking);
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(500).json({ error: "Failed to create booking" });
    }
  }
);

export default hallRoutes;
