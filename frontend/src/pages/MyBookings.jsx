import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaCalendar, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/bookings/my-bookings`
      );
      setBookings(res.data.bookings);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/bookings/${bookingId}/cancel`
      );
      toast.success('Booking cancelled successfully');
      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel booking');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          My <span className="gradient-text">Bookings</span>
        </motion.h1>

        {bookings.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-2xl text-gray-400">No bookings yet</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                className="bg-dark-card p-6 rounded-xl border border-dark-border"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Event Image */}
                  <div className="w-full md:w-48 h-48 rounded-lg overflow-hidden">
                    <img
                      src={booking.event.image}
                      alt={booking.event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">
                          {booking.event.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.bookingStatus === 'confirmed'
                              ? 'bg-green-600'
                              : booking.bookingStatus === 'cancelled'
                              ? 'bg-red-600'
                              : 'bg-yellow-600'
                          }`}
                        >
                          {booking.bookingStatus.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-sm">Booking ID</p>
                        <p className="font-mono text-sm">{booking.bookingId}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <FaCalendar className="text-primary" />
                        <div>
                          <p className="text-gray-400 text-xs">Event Date</p>
                          <p className="text-sm">
                            {new Date(booking.event.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-accent-pink" />
                        <div>
                          <p className="text-gray-400 text-xs">Venue</p>
                          <p className="text-sm">{booking.event.venue}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <FaTicketAlt className="text-accent-cyan" />
                        <div>
                          <p className="text-gray-400 text-xs">Tickets</p>
                          <p className="text-sm">{booking.numberOfTickets}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-gray-400 text-xs">Total Amount</p>
                        <p className="text-xl font-bold text-primary">
                          ${booking.totalAmount}
                        </p>
                      </div>
                    </div>

                    {booking.bookingStatus === 'confirmed' && (
                      <motion.button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Cancel Booking
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
