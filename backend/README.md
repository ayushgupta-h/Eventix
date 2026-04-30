# Eventix Backend

Event Booking Platform Backend API built with Node.js, Express, and MongoDB.

## Features

- JWT Authentication
- OTP-based Email Verification
- User & Admin Roles
- Event Management (CRUD)
- Booking System
- MongoDB Database

## Installation

```bash
cd backend
npm install
```

## Environment Variables

Create a `.env` file in the backend directory:

```
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

## Run Server

```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/verify-otp` - Verify OTP
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user (Protected)

### Events
- GET `/api/events` - Get all events
- GET `/api/events/:id` - Get single event
- POST `/api/events` - Create event (Admin only)
- PUT `/api/events/:id` - Update event (Admin only)
- DELETE `/api/events/:id` - Delete event (Admin only)

### Bookings
- POST `/api/bookings` - Create booking (Protected)
- GET `/api/bookings/my-bookings` - Get user bookings (Protected)
- GET `/api/bookings` - Get all bookings (Admin only)
- PUT `/api/bookings/:id/cancel` - Cancel booking (Protected)

## Database Models

- **User**: name, email, password, role, isVerified, otp
- **Event**: title, description, category, date, venue, price, seats
- **Booking**: user, event, numberOfTickets, totalAmount, status
