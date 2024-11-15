
import mongoose from "mongoose";


const mongoURI = process.env.MONGODB_URI;
const connectDB = async (option) => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;