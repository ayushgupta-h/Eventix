import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Music',
    date: '',
    time: '',
    venue: '',
    price: '',
    totalSeats: '',
    image: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/events`);
      setEvents(res.data.events);
    } catch (error) {
      toast.error('Failed to fetch events');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingEvent) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/events/${editingEvent._id}`,
          formData
        );
        toast.success('Event updated successfully');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/events`, formData);
        toast.success('Event created successfully');
      }

      setShowModal(false);
      setEditingEvent(null);
      resetForm();
      fetchEvents();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      category: event.category,
      date: event.date.split('T')[0],
      time: event.time,
      venue: event.venue,
      price: event.price,
      totalSeats: event.totalSeats,
      image: event.image,
    });
    setShowModal(true);
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/events/${eventId}`);
      toast.success('Event deleted successfully');
      fetchEvents();
    } catch (error) {
      toast.error('Failed to delete event');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Music',
      date: '',
      time: '',
      venue: '',
      price: '',
      totalSeats: '',
      image: '',
    });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            className="text-4xl font-bold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Admin <span className="gradient-text">Dashboard</span>
          </motion.h1>

          <motion.button
            onClick={() => {
              setEditingEvent(null);
              resetForm();
              setShowModal(true);
            }}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus />
            <span>Create Event</span>
          </motion.button>
        </div>

        {/* Events Table */}
        <div className="bg-dark-card rounded-xl border border-dark-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-hover">
                <tr>
                  <th className="px-6 py-4 text-left">Event</th>
                  <th className="px-6 py-4 text-left">Category</th>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-left">Price</th>
                  <th className="px-6 py-4 text-left">Seats</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <motion.tr
                    key={event._id}
                    className="border-t border-dark-border hover:bg-dark-hover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <span className="font-semibold">{event.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{event.category}</td>
                    <td className="px-6 py-4">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">${event.price}</td>
                    <td className="px-6 py-4">
                      {event.availableSeats}/{event.totalSeats}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <motion.button
                          onClick={() => handleEdit(event)}
                          className="text-primary hover:text-primary-light"
                          whileHover={{ scale: 1.2 }}
                        >
                          <FaEdit size={18} />
                        </motion.button>
                        <motion.button
                          onClick={() => handleDelete(event._id)}
                          className="text-red-500 hover:text-red-400"
                          whileHover={{ scale: 1.2 }}
                        >
                          <FaTrash size={18} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-dark-card p-8 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6">
                {editingEvent ? 'Edit Event' : 'Create New Event'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary"
                    >
                      <option>Music</option>
                      <option>Sports</option>
                      <option>Technology</option>
                      <option>Arts</option>
                      <option>Business</option>
                      <option>Food</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Time</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Venue</label>
                    <input
                      type="text"
                      name="venue"
                      value={formData.venue}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Total Seats
                    </label>
                    <input
                      type="number"
                      name="totalSeats"
                      value={formData.totalSeats}
                      onChange={handleChange}
                      required
                      min="1"
                      className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <motion.button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {editingEvent ? 'Update Event' : 'Create Event'}
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingEvent(null);
                      resetForm();
                    }}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
