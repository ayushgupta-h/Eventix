# Eventix - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Clone and Setup

```bash
# Navigate to the project
cd Eventix-1

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Configure Environment Variables

**Backend (.env in backend folder):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://aaayushgupta26_db_user:gfOQJWZbCJ1U05zT@cluster0.tvzqde5.mongodb.net/eventix?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=eventix_super_secret_key_2024
JWT_EXPIRE=7d
NODE_ENV=development
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

**Frontend (.env in frontend folder):**
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 4: Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🎯 Test the Application

### Create Admin User (First Time)

1. Register a new user through the UI
2. Verify email with OTP
3. Manually update the user role in MongoDB:
   - Open MongoDB Atlas or Compass
   - Find your user in the `users` collection
   - Change `role` from `"user"` to `"admin"`

### Test User Flow

1. **Register**: Create account → Receive OTP → Verify email
2. **Login**: Use credentials to login
3. **Browse Events**: View all available events
4. **Book Tickets**: Select event → Choose quantity → Book
5. **View Bookings**: Check "My Bookings" page
6. **Cancel Booking**: Cancel if needed

### Test Admin Flow

1. **Login as Admin**: Use admin credentials
2. **Access Dashboard**: Navigate to Admin panel
3. **Create Event**: Add new event with details
4. **Edit Event**: Update existing events
5. **Delete Event**: Remove events
6. **View All Bookings**: Monitor all user bookings

## 🎨 Key Features to Test

### Anti-Gravity Animations
- Event cards float smoothly on the Events page
- Hover over cards to see enhanced floating effect
- Buttons have smooth scale animations
- Hero section has floating gradient orbs

### Dark Theme
- Entire app uses dark color scheme
- Gradient text effects on headings
- Glass morphism effects on cards
- Smooth color transitions

### Authentication
- OTP-based email verification
- JWT token management
- Protected routes
- Role-based access control

## 📧 Email Configuration (Important!)

To enable OTP functionality:

1. Use a Gmail account
2. Enable 2-Factor Authentication
3. Generate an App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification
   - App Passwords → Generate
4. Use the generated password in `EMAIL_PASS`

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB URI is correct
- Check network access in MongoDB Atlas
- Ensure IP address is whitelisted

### Email Not Sending
- Verify Gmail credentials
- Check App Password is correct
- Ensure 2FA is enabled on Gmail

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 3000
npx kill-port 3000
```

### CORS Issues
- Ensure backend CORS is configured
- Check API URL in frontend .env
- Verify both servers are running

## 🎓 Sample Data

### Sample Event Data (for Admin)
```json
{
  "title": "Summer Music Festival 2026",
  "description": "Join us for an unforgettable night of live music featuring top artists from around the world.",
  "category": "Music",
  "date": "2026-07-15",
  "time": "18:00",
  "venue": "Central Park Amphitheater",
  "price": 75,
  "totalSeats": 500,
  "image": "https://images.unsplash.com/photo-1459749411175-04bf5292ceea"
}
```

## 📱 Responsive Design

Test on different screen sizes:
- Desktop: Full layout with sidebar
- Tablet: Adjusted grid layouts
- Mobile: Hamburger menu, stacked cards

## 🔐 Default Test Credentials

After creating and promoting a user to admin:
- Email: admin@eventix.com
- Password: admin123

Regular user:
- Email: user@eventix.com
- Password: user123

## 🎉 You're All Set!

Explore the application and enjoy the smooth anti-gravity animations and dark theme UI!

For detailed documentation, see [README.md](README.md)
