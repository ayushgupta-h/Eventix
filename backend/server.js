const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const testRoutes = require('./routes/testRoutes'); // TEMPORARY - Remove in production
const seedRoutes = require('./routes/seedRoutes'); // TEMPORARY - Remove in production

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://eventix-frontend.vercel.app', 'https://eventix.vercel.app'] // Update with your actual frontend URL
    : '*',
  credentials: true,
};
app.use(cors(corsOptions));

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/test', testRoutes); // TEMPORARY - Remove in production
app.use('/api/seed', seedRoutes); // TEMPORARY - Remove in production

// Error handler
app.use(errorHandler);

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Eventix API',
    version: '1.0.0',
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
