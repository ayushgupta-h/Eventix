const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide event title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide event description'],
  },
  category: {
    type: String,
    required: [true, 'Please provide event category'],
    enum: ['Music', 'Sports', 'Technology', 'Arts', 'Business', 'Food', 'Other'],
  },
  date: {
    type: Date,
    required: [true, 'Please provide event date'],
  },
  time: {
    type: String,
    required: [true, 'Please provide event time'],
  },
  venue: {
    type: String,
    required: [true, 'Please provide event venue'],
  },
  location: {
    city: String,
    state: String,
    country: String,
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/400x300',
  },
  price: {
    type: Number,
    required: [true, 'Please provide ticket price'],
    min: 0,
  },
  totalSeats: {
    type: Number,
    required: [true, 'Please provide total seats'],
    min: 1,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Set available seats equal to total seats before saving
eventSchema.pre('save', function (next) {
  if (this.isNew) {
    this.availableSeats = this.totalSeats;
  }
  next();
});

module.exports = mongoose.model('Event', eventSchema);
