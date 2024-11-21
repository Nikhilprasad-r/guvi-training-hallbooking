import express from "express";
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const user = new User({ username, password, role });
    await user.save();

    const token = generateToken({ id: user._id, role: user.role });

    // Set JWT token in cookies
    // res.cookie("authtoken", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 3600000, // 1 hour
    //   sameSite: "strict",
    // });

    res.header("Acess-Control-Expose-Header", "Authorization");
    res.header("Authorization", `Bearer ${token}`);

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, role: user.role },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = generateToken({ id: user._id, role: user.role });

    // Set JWT token in cookies
    // res.cookie("authtoken", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 3600000, // 1 hour
    //   sameSite: "strict",
    // });
    res.header("Acess-Control-Expose-Header", "Authorization");
    res.header("Authorization", `Bearer ${token}`);

    res.json({
      message: "User logged in successfully",
      user: { id: user._id, role: user.role },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Logout a user
router.post("/logout", (req, res) => {
  try {
    // Clear the JWT cookie
    res.clearCookie("authtoken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
