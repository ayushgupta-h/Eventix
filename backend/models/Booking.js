const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  numberOfTickets: {
    type: Number,
    required: [true, 'Please provide number of tickets'],
    min: 1,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  bookingStatus: {
    type: String,
    enum: ['confirmed', 'cancelled', 'pending'],
    default: 'confirmed',
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'pending', 'failed'],
    default: 'paid',
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  bookingId: {
    type: String,
    unique: true,
  },
});

// Generate unique booking ID before saving
bookingSchema.pre('save', function (next) {
  if (this.isNew) {
    this.bookingId = `BK${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
