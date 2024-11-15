import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  hallId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall' },
  date: Date,
  user: {
    name: String,
    phone: String,
    
  },
});

export default mongoose.model('Booking', BookingSchema);
