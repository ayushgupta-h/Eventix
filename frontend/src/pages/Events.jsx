import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import EventCard from '../components/EventCard';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    category: '',
    search: '',
  });

  const categories = ['All', 'Music', 'Sports', 'Technology', 'Arts', 'Business', 'Food', 'Other'];

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  const fetchEvents = async () => {
    try {
      const params = {};
      if (filter.category && filter.category !== 'All') {
        params.category = filter.category;
      }
      if (filter.search) {
        params.search = filter.search;
      }

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/events`, {
        params,
      });
      setEvents(res.data.events);
    } catch (error) {
      toast.error('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setFilter({ ...filter, category: category === 'All' ? '' : category });
  };

  const handleSearchChange = (e) => {
    setFilter({ ...filter, search: e.target.value });
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
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Explore <span className="gradient-text">Events</span>
        </motion.h1>

        {/* Search Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <input
            type="text"
            placeholder="Search events..."
            value={filter.search}
            onChange={handleSearchChange}
            className="w-full px-6 py-4 bg-dark-card border border-dark-border rounded-lg focus:outline-none focus:border-primary transition-colors"
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap gap-3 mb-12 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                (filter.category === category || (category === 'All' && !filter.category))
                  ? 'bg-primary text-white'
                  : 'bg-dark-card text-gray-400 hover:bg-dark-hover'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-2xl text-gray-400">No events found</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <EventCard key={event._id} event={event} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
