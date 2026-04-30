import { motion } from 'framer-motion';
import { FaCalendar, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event, index }) => {
  const navigate = useNavigate();

  // Anti-gravity floating animation variants
  const cardVariants = {
    initial: {
      y: 0,
      opacity: 0,
      scale: 0.9,
    },
    animate: {
      y: [0, -15, 0],
      opacity: 1,
      scale: 1,
      transition: {
        y: {
          duration: 4 + index * 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        opacity: {
          duration: 0.5,
        },
        scale: {
          duration: 0.5,
        },
      },
    },
    hover: {
      y: -25,
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="bg-dark-card rounded-xl overflow-hidden border border-dark-border cursor-pointer group"
      onClick={() => navigate(`/events/${event._id}`)}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent opacity-60" />
        
        {/* Category Badge */}
        <motion.div
          className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full text-xs font-semibold"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          {event.category}
        </motion.div>

        {/* Price Tag */}
        <motion.div
          className="absolute bottom-4 left-4 bg-accent-purple px-4 py-2 rounded-lg font-bold text-lg"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ${event.price}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
          {event.title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2">
          <motion.div
            className="flex items-center text-gray-300 text-sm"
            whileHover={{ x: 5 }}
          >
            <FaCalendar className="mr-2 text-primary" />
            <span>{formatDate(event.date)} at {event.time}</span>
          </motion.div>

          <motion.div
            className="flex items-center text-gray-300 text-sm"
            whileHover={{ x: 5 }}
          >
            <FaMapMarkerAlt className="mr-2 text-accent-pink" />
            <span>{event.venue}</span>
          </motion.div>

          <motion.div
            className="flex items-center text-gray-300 text-sm"
            whileHover={{ x: 5 }}
          >
            <FaTicketAlt className="mr-2 text-accent-cyan" />
            <span>{event.availableSeats} seats available</span>
          </motion.div>
        </div>

        {/* Book Now Button */}
        <motion.button
          className="w-full mt-4 bg-gradient-to-r from-primary to-accent-purple text-white py-2 rounded-lg font-semibold"
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
          }}
          whileTap={{ scale: 0.95 }}
        >
          Book Now
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EventCard;
