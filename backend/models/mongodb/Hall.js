import mongoose from "mongoose";

const HallSchema = new mongoose.Schema({
  name: String,
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
});

HallSchema.index({ name: "text" });

export default mongoose.model("Hall", HallSchema);
