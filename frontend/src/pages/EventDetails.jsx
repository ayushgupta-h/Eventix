import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaCalendar, FaMapMarkerAlt, FaTicketAlt, FaUser } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/events/${id}`);
      setEvent(res.data.event);
    } catch (error) {
      toast.error('Failed to fetch event details');
      navigate('/events');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!user) {
      toast.error('Please login to book tickets');
      navigate('/login');
      return;
    }

    setBooking(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/bookings`,
        {
          eventId: id,
          numberOfTickets,
        }
      );

      toast.success('Booking successful!');
      navigate('/my-bookings');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setBooking(false);
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

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="bg-dark-card rounded-2xl overflow-hidden border border-dark-border"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Event Image */}
          <div className="relative h-96">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent" />
            <motion.div
              className="absolute top-6 right-6 bg-primary px-4 py-2 rounded-full font-bold text-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {event.category}
            </motion.div>
          </div>

          {/* Event Details */}
          <div className="p-8">
            <motion.h1
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {event.title}
            </motion.h1>

            <motion.p
              className="text-gray-400 text-lg mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {event.description}
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div
                className="flex items-center space-x-3 text-lg"
                whileHover={{ x: 5 }}
              >
                <FaCalendar className="text-primary text-2xl" />
                <div>
                  <p className="text-gray-400 text-sm">Date & Time</p>
                  <p className="font-semibold">{formatDate(event.date)} at {event.time}</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-3 text-lg"
                whileHover={{ x: 5 }}
              >
                <FaMapMarkerAlt className="text-accent-pink text-2xl" />
                <div>
                  <p className="text-gray-400 text-sm">Venue</p>
                  <p className="font-semibold">{event.venue}</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-3 text-lg"
                whileHover={{ x: 5 }}
              >
                <FaTicketAlt className="text-accent-cyan text-2xl" />
                <div>
                  <p className="text-gray-400 text-sm">Available Seats</p>
                  <p className="font-semibold">{event.availableSeats} / {event.totalSeats}</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-3 text-lg"
                whileHover={{ x: 5 }}
              >
                <FaUser className="text-accent-purple text-2xl" />
                <div>
                  <p className="text-gray-400 text-sm">Organizer</p>
                  <p className="font-semibold">{event.organizer?.name}</p>
                </div>
              </motion.div>
            </div>

            {/* Booking Section */}
            <motion.div
              className="bg-dark-bg p-6 rounded-xl border border-dark-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-gray-400 text-sm">Price per ticket</p>
                  <p className="text-3xl font-bold text-primary">${event.price}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Number of tickets</p>
                  <div className="flex items-center space-x-4">
                    <motion.button
                      onClick={() => setNumberOfTickets(Math.max(1, numberOfTickets - 1))}
                      className="bg-dark-card px-4 py-2 rounded-lg font-bold text-xl"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      -
                    </motion.button>
                    <span className="text-2xl font-bold">{numberOfTickets}</span>
                    <motion.button
                      onClick={() =>
                        setNumberOfTickets(
                          Math.min(event.availableSeats, numberOfTickets + 1)
                        )
                      }
                      className="bg-dark-card px-4 py-2 rounded-lg font-bold text-xl"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      +
                    </motion.button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <p className="text-xl font-semibold">Total Amount</p>
                <p className="text-3xl font-bold gradient-text">
                  ${event.price * numberOfTickets}
                </p>
              </div>

              <motion.button
                onClick={handleBooking}
                disabled={booking || event.availableSeats === 0}
                className="w-full bg-gradient-to-r from-primary to-accent-purple text-white py-4 rounded-lg text-lg font-semibold disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {booking
                  ? 'Processing...'
                  : event.availableSeats === 0
                  ? 'Sold Out'
                  : 'Book Now'}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetails;
