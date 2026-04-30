const express = require('express');
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking,
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/').post(protect, createBooking).get(protect, authorize('admin'), getAllBookings);

router.get('/my-bookings', protect, getMyBookings);
router.put('/:id/cancel', protect, cancelBooking);

module.exports = router;
