import express from "express";
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ username, password });
    await user.save();






    const token = generateToken(user._id);

    // Set JWT token in cookies
    res.cookie("token", token, {
      httpOnly: true,    // Makes the cookie accessible only by the server
      secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
      maxAge: 3600000,   // Set cookie expiration time (1 hour)
      sameSite: "strict" // Protect against CSRF attacks
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    // Set JWT token in cookies
    res.cookie("token", token, {
      httpOnly: true,    // Makes the cookie accessible only by the server
      secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
      maxAge: 3600000,   // Set cookie expiration time (1 hour)
      sameSite: "strict" // Protect against CSRF attacks
    });

    res.json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

export default router;
