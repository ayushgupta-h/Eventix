const Event = require('../models/Event');
const User = require('../models/User');

// Sample events data
const sampleEvents = [
  {
    title: 'Summer Music Festival 2026',
    description: 'Join us for an unforgettable night of live music featuring top artists from around the world. Experience the best of rock, pop, and electronic music under the stars.',
    category: 'Music',
    date: new Date('2026-08-15'),
    time: '18:00',
    venue: 'Central Park Amphitheater',
    location: {
      city: 'New York',
      state: 'NY',
      country: 'USA',
    },
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
    price: 75,
    totalSeats: 500,
    status: 'upcoming',
  },
  {
    title: 'Tech Innovation Summit 2026',
    description: 'Discover the latest in AI, blockchain, and cloud computing. Network with industry leaders and learn about cutting-edge technologies shaping our future.',
    category: 'Technology',
    date: new Date('2026-09-20'),
    time: '09:00',
    venue: 'Silicon Valley Convention Center',
    location: {
      city: 'San Jose',
      state: 'CA',
      country: 'USA',
    },
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    price: 150,
    totalSeats: 300,
    status: 'upcoming',
  },
  {
    title: 'NBA Finals Game 7',
    description: 'Witness basketball history in the making! The ultimate showdown for the championship title. Premium seats available for this once-in-a-lifetime experience.',
    category: 'Sports',
    date: new Date('2026-06-18'),
    time: '20:00',
    venue: 'Madison Square Garden',
    location: {
      city: 'New York',
      state: 'NY',
      country: 'USA',
    },
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
    price: 250,
    totalSeats: 200,
    status: 'upcoming',
  },
  {
    title: 'Modern Art Exhibition',
    description: 'Explore contemporary masterpieces from renowned artists worldwide. Interactive installations, live painting sessions, and exclusive gallery tours.',
    category: 'Arts',
    date: new Date('2026-07-10'),
    time: '10:00',
    venue: 'Metropolitan Museum of Art',
    location: {
      city: 'New York',
      state: 'NY',
      country: 'USA',
    },
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800',
    price: 35,
    totalSeats: 150,
    status: 'upcoming',
  },
  {
    title: 'International Food Festival',
    description: 'Taste cuisines from 50+ countries! Celebrity chef demonstrations, cooking workshops, and unlimited food sampling. A culinary journey around the world.',
    category: 'Food',
    date: new Date('2026-08-05'),
    time: '12:00',
    venue: 'Brooklyn Food Market',
    location: {
      city: 'Brooklyn',
      state: 'NY',
      country: 'USA',
    },
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
    price: 45,
    totalSeats: 400,
    status: 'upcoming',
  },
  {
    title: 'Startup Pitch Competition',
    description: 'Watch innovative startups pitch to top investors. Network with entrepreneurs, VCs, and industry experts. $1M prize pool for winners!',
    category: 'Business',
    date: new Date('2026-09-15'),
    time: '14:00',
    venue: 'WeWork Times Square',
    location: {
      city: 'New York',
      state: 'NY',
      country: 'USA',
    },
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
    price: 100,
    totalSeats: 250,
    status: 'upcoming',
  },
  {
    title: 'Jazz Night Under the Stars',
    description: 'Smooth jazz performances by Grammy-winning artists. Enjoy cocktails and gourmet appetizers in an intimate outdoor setting.',
    category: 'Music',
    date: new Date('2026-07-25'),
    time: '19:30',
    venue: 'Rooftop Garden Lounge',
    location: {
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
    },
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800',
    price: 65,
    totalSeats: 120,
    status: 'upcoming',
  },
  {
    title: 'Champions League Final',
    description: 'The biggest match in European football! Watch the best teams battle for glory. Premium hospitality packages available.',
    category: 'Sports',
    date: new Date('2026-05-30'),
    time: '21:00',
    venue: 'Wembley Stadium',
    location: {
      city: 'London',
      state: 'England',
      country: 'UK',
    },
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800',
    price: 300,
    totalSeats: 180,
    status: 'upcoming',
  },
  {
    title: 'Digital Marketing Masterclass',
    description: 'Learn from industry experts about SEO, social media marketing, content strategy, and analytics. Hands-on workshops and certification included.',
    category: 'Business',
    date: new Date('2026-08-28'),
    time: '09:30',
    venue: 'Business Innovation Hub',
    location: {
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
    },
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
    price: 120,
    totalSeats: 200,
    status: 'upcoming',
  },
  {
    title: 'Electronic Dance Music Festival',
    description: 'Three days of non-stop EDM with world-famous DJs. Multiple stages, art installations, and an unforgettable party atmosphere.',
    category: 'Music',
    date: new Date('2026-09-10'),
    time: '16:00',
    venue: 'Desert Festival Grounds',
    location: {
      city: 'Las Vegas',
      state: 'NV',
      country: 'USA',
    },
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
    price: 200,
    totalSeats: 1000,
    status: 'upcoming',
  },
  {
    title: 'Photography Workshop',
    description: 'Master the art of photography with professional photographers. Covers portrait, landscape, and street photography techniques.',
    category: 'Arts',
    date: new Date('2026-07-18'),
    time: '10:00',
    venue: 'Creative Arts Studio',
    location: {
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
    },
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800',
    price: 80,
    totalSeats: 30,
    status: 'upcoming',
  },
  {
    title: 'Wine Tasting Experience',
    description: 'Sample premium wines from renowned vineyards. Expert sommeliers guide you through tasting notes and food pairings.',
    category: 'Food',
    date: new Date('2026-08-22'),
    time: '18:00',
    venue: 'Napa Valley Winery',
    location: {
      city: 'Napa',
      state: 'CA',
      country: 'USA',
    },
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800',
    price: 95,
    totalSeats: 60,
    status: 'upcoming',
  },
];

// @desc    Seed database with sample events
// @route   POST /api/seed/events
// @access  Public (for development only)
exports.seedEvents = async (req, res) => {
  try {
    // Find or create a default admin user for events
    let admin = await User.findOne({ email: 'admin@eventix.com' });
    
    if (!admin) {
      admin = await User.create({
        name: 'Eventix Admin',
        email: 'admin@eventix.com',
        password: 'admin123',
        role: 'admin',
        isVerified: true,
      });
    }

    // Delete existing events (optional - comment out if you want to keep existing)
    await Event.deleteMany({});

    // Add organizer and availableSeats to each event
    const eventsWithOrganizer = sampleEvents.map(event => ({
      ...event,
      organizer: admin._id,
      availableSeats: event.totalSeats, // Set available seats equal to total seats
    }));

    // Insert sample events
    const events = await Event.insertMany(eventsWithOrganizer);

    res.status(201).json({
      success: true,
      message: `${events.length} sample events created successfully!`,
      count: events.length,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Clear all events
// @route   DELETE /api/seed/events
// @access  Public (for development only)
exports.clearEvents = async (req, res) => {
  try {
    await Event.deleteMany({});
    
    res.status(200).json({
      success: true,
      message: 'All events cleared successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
