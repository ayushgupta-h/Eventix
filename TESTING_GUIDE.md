# 🧪 Testing Guide - Quick Start

## Current Status

✅ **Frontend**: Running at http://localhost:3000/
⚠️ **Backend**: Running at http://localhost:5000/ (waiting for MongoDB)

## 🚀 Quick Start (Once MongoDB Connects)

### Step 1: Create Test Users (No Email Required!)

Once MongoDB connects, open your browser and visit these URLs:

**Create Admin User:**
```
http://localhost:5000/api/test/create-admin
```

**Create Regular User:**
```
http://localhost:5000/api/test/create-user
```

You'll see credentials like:
```json
{
  "success": true,
  "message": "Test admin created successfully",
  "credentials": {
    "email": "admin@test.com",
    "password": "admin123"
  }
}
```

### Step 2: Login to the App

1. Go to: http://localhost:3000/login
2. Use these credentials:

**Admin Login:**
- Email: `admin@test.com`
- Password: `admin123`

**User Login:**
- Email: `user@test.com`
- Password: `user123`

### Step 3: Test Admin Features

After logging in as admin:

1. Go to: http://localhost:3000/admin
2. Click "Create Event"
3. Fill in event details:
   ```
   Title: Summer Music Festival
   Description: Amazing live music event
   Category: Music
   Date: 2026-08-15
   Time: 18:00
   Venue: Central Park
   Price: 50
   Total Seats: 100
   Image: https://images.unsplash.com/photo-1459749411175-04bf5292ceea
   ```
4. Click "Create Event"

### Step 4: Test User Features

1. Logout and login as regular user
2. Go to: http://localhost:3000/events
3. Click on an event card
4. Select number of tickets
5. Click "Book Now"
6. View your booking at: http://localhost:3000/my-bookings

## 🎨 Features to Test

### Visual Features (Work Now!)
- ✅ Dark theme throughout
- ✅ Anti-gravity floating animations on cards
- ✅ Smooth hover effects
- ✅ Gradient text and buttons
- ✅ Responsive design (try resizing browser)
- ✅ Mobile menu (on small screens)

### Backend Features (After MongoDB Connects)
- ✅ User authentication
- ✅ Event creation (Admin)
- ✅ Event browsing
- ✅ Ticket booking
- ✅ Booking management
- ✅ Seat availability tracking

## 🔧 Troubleshooting

### MongoDB Still Not Connected?

**Check Network Access in MongoDB Atlas:**
1. Go to: https://cloud.mongodb.com/
2. Click "Network Access"
3. Ensure "0.0.0.0/0" is in the IP Access List
4. Wait 2-3 minutes after adding

**Check Backend Terminal:**
Look for this success message:
```
MongoDB Connected: cluster0.tvzqde5.mongodb.net
Database Name: eventix
```

### Can't See Events?

You need to create events first as admin:
1. Login as admin@test.com
2. Go to /admin
3. Create some events

### Booking Not Working?

Make sure:
1. You're logged in
2. Event has available seats
3. Backend is connected to MongoDB

## 📱 Test on Different Devices

1. **Desktop**: Full experience with all features
2. **Tablet**: Adjusted layouts
3. **Mobile**: Hamburger menu, stacked cards

Open http://localhost:3000/ on your phone (same network) using your computer's IP:
```
http://YOUR_COMPUTER_IP:3000/
```

## 🎯 What to Look For

### Animations
- Cards should float up and down smoothly
- Hover over cards for enhanced lift effect
- Buttons scale on click
- Smooth page transitions

### Dark Theme
- Background: Very dark (#0a0a0f)
- Cards: Dark gray (#13131a)
- Primary color: Indigo/purple
- Gradient effects on headings

### Functionality
- Registration with OTP (if email configured)
- Login/Logout
- Event filtering by category
- Event search
- Booking with seat selection
- Booking cancellation

## 🎉 Success Criteria

You'll know everything is working when:

1. ✅ Backend shows "MongoDB Connected"
2. ✅ You can login with test credentials
3. ✅ Admin can create events
4. ✅ Users can book tickets
5. ✅ Animations are smooth
6. ✅ Dark theme looks beautiful

## 🚨 Important Notes

**Test Routes are TEMPORARY:**
- The `/api/test/*` routes are for testing only
- Remove them before deploying to production
- They bypass email verification for quick testing

**Production Setup:**
- Configure real email credentials
- Remove test routes
- Use proper user registration flow
- Set strong JWT_SECRET in .env

## 📞 Need Help?

If MongoDB still won't connect after 5 minutes:
1. Check your internet connection
2. Try using a VPN
3. Contact MongoDB Atlas support
4. Consider using local MongoDB instead

Enjoy testing Eventix! 🎊
