# Eventix - Event Booking Platform

A full-stack MERN event booking web application with dark theme UI and smooth anti-gravity animations.

## Features

### Frontend
- ⚛️ React 18 with Vite
- 🎨 Dark Theme UI with Tailwind CSS
- ✨ Framer Motion for smooth anti-gravity animations
- 🔐 JWT Authentication with OTP verification
- 📱 Fully Responsive Design
- 🎭 Beautiful gradient effects and glass morphism

### Backend
- 🚀 Node.js & Express.js
- 🗄️ MongoDB with Mongoose
- 🔒 JWT Authentication
- 📧 OTP-based Email Verification
- 👥 User & Admin Roles
- 🎫 Event & Booking Management

## Tech Stack

**Frontend:**
- React
- React Router DOM
- Framer Motion
- Tailwind CSS
- Axios
- React Toastify
- React Icons

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- Bcrypt.js
- Nodemailer
- CORS

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- Gmail account for email OTP

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
NODE_ENV=development
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

4. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
eventix/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   └── bookingController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Event.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   └── bookingRoutes.js
│   ├── utils/
│   │   ├── generateOTP.js
│   │   ├── generateToken.js
│   │   └── sendEmail.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── EventCard.jsx
    │   │   ├── Navbar.jsx
    │   │   └── PrivateRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Events.jsx
    │   │   ├── EventDetails.jsx
    │   │   ├── MyBookings.jsx
    │   │   └── AdminDashboard.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

## Features Breakdown

### Authentication
- User registration with email verification
- OTP-based verification system
- JWT token authentication
- Protected routes for authenticated users
- Role-based access control (User/Admin)

### User Features
- Browse all events
- Filter events by category
- Search events
- View event details
- Book tickets
- View booking history
- Cancel bookings

### Admin Features
- Create new events
- Edit existing events
- Delete events
- View all bookings
- Manage event inventory

### UI/UX Features
- Dark theme throughout the application
- Anti-gravity floating animations on cards
- Smooth transitions and hover effects
- Responsive design for all devices
- Toast notifications for user feedback
- Loading states and error handling

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (Admin only)
- `PUT /api/events/:id` - Update event (Admin only)
- `DELETE /api/events/:id` - Delete event (Admin only)

### Bookings
- `POST /api/bookings` - Create booking (Protected)
- `GET /api/bookings/my-bookings` - Get user bookings (Protected)
- `GET /api/bookings` - Get all bookings (Admin only)
- `PUT /api/bookings/:id/cancel` - Cancel booking (Protected)

## Database Models

### User Model
- name
- email
- password (hashed)
- role (user/admin)
- isVerified
- otp
- otpExpire

### Event Model
- title
- description
- category
- date
- time
- venue
- location
- image
- price
- totalSeats
- availableSeats
- organizer (ref: User)
- status

### Booking Model
- user (ref: User)
- event (ref: Event)
- numberOfTickets
- totalAmount
- bookingStatus
- paymentStatus
- bookingDate
- bookingId

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

Full-Stack MERN Developer

## Acknowledgments

- Framer Motion for amazing animations
- Tailwind CSS for utility-first styling
- MongoDB Atlas for database hosting
- React Icons for beautiful icons
