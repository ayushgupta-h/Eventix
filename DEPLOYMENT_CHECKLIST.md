# ✅ Vercel Deployment Checklist

## 🎯 Quick Start Guide

### **Before You Start**
- [ ] Code is pushed to GitHub ✅ (Done!)
- [ ] You have a Vercel account (Sign up at https://vercel.com)
- [ ] You have MongoDB Atlas account (https://cloud.mongodb.com)

---

## 📋 Step-by-Step Checklist

### **PART 1: MongoDB Atlas Setup (5 minutes)**

#### Step 1.1: Create Database User
- [ ] Go to https://cloud.mongodb.com/
- [ ] Click "Database Access" → "Add New Database User"
- [ ] Username: `eventix_user`
- [ ] Password: (Generate and SAVE IT!)
- [ ] Privileges: "Read and write to any database"
- [ ] Click "Add User"

#### Step 1.2: Whitelist IPs
- [ ] Click "Network Access" → "Add IP Address"
- [ ] Click "ALLOW ACCESS FROM ANYWHERE" (0.0.0.0/0)
- [ ] Click "Confirm"
- [ ] Wait 2-3 minutes ⏰

#### Step 1.3: Get Connection String
- [ ] Go to "Database" → Click "Connect"
- [ ] Choose "Connect your application"
- [ ] Copy connection string
- [ ] Replace `<password>` with your actual password
- [ ] Add `/eventix` before the `?` in the URL
- [ ] Final format: `mongodb+srv://eventix_user:PASSWORD@cluster0.xxxxx.mongodb.net/eventix?retryWrites=true&w=majority`
- [ ] **SAVE THIS STRING!** 📝

---

### **PART 2: Deploy Backend (5 minutes)**

#### Step 2.1: Import Project
- [ ] Go to https://vercel.com/new
- [ ] Sign in with GitHub
- [ ] Click "Import" next to `ayushgupta-h/Eventix`

#### Step 2.2: Configure Backend
- [ ] Framework Preset: **Other**
- [ ] Root Directory: Click "Edit" → Select **`backend`**
- [ ] Build Command: Leave empty
- [ ] Output Directory: Leave empty
- [ ] Install Command: `npm install`

#### Step 2.3: Add Environment Variables
Click "Environment Variables" and add these ONE BY ONE:

| Name | Value |
|------|-------|
| `PORT` | `5000` |
| `MONGODB_URI` | Your MongoDB connection string from Step 1.3 |
| `JWT_SECRET` | `eventix_super_secret_key_2024_production` |
| `JWT_EXPIRE` | `7d` |
| `NODE_ENV` | `production` |

- [ ] All 5 variables added
- [ ] Click "Deploy"
- [ ] Wait for deployment (2-3 minutes) ⏰

#### Step 2.4: Test Backend
- [ ] Copy your backend URL (e.g., `https://eventix-backend-xxx.vercel.app`)
- [ ] Visit the URL in browser
- [ ] Should see: `{"message":"Welcome to Eventix API","version":"1.0.0"}`
- [ ] **SAVE YOUR BACKEND URL!** 📝

---

### **PART 3: Deploy Frontend (5 minutes)**

#### Step 3.1: Import Project Again
- [ ] Go to https://vercel.com/new
- [ ] Click "Import" next to `ayushgupta-h/Eventix` (same repo)

#### Step 3.2: Configure Frontend
- [ ] Framework Preset: **Vite**
- [ ] Root Directory: Click "Edit" → Select **`frontend`**
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Install Command: `npm install`

#### Step 3.3: Add Environment Variable
Click "Environment Variables" and add:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://your-backend-url.vercel.app/api` |

**Important**: Replace `your-backend-url` with your actual backend URL from Step 2.4

- [ ] Variable added
- [ ] Click "Deploy"
- [ ] Wait for deployment (2-3 minutes) ⏰

#### Step 3.4: Get Frontend URL
- [ ] Copy your frontend URL (e.g., `https://eventix-xxx.vercel.app`)
- [ ] **SAVE YOUR FRONTEND URL!** 📝

---

### **PART 4: Update CORS (2 minutes)**

#### Step 4.1: Update Backend Code
You need to update the CORS settings in your backend to allow your frontend URL.

**Option A: Update Locally and Push**
1. Open `backend/server.js`
2. Find the CORS section
3. Replace the origin array with your actual frontend URL:
```javascript
const corsOptions = {
  origin: ['https://your-actual-frontend-url.vercel.app'],
  credentials: true,
};
```
4. Save, commit, and push:
```bash
git add backend/server.js
git commit -m "Update CORS for production frontend"
git push
```
5. Vercel will auto-deploy

**Option B: Update in Vercel Dashboard**
- [ ] Go to your backend project in Vercel
- [ ] Go to "Settings" → "Environment Variables"
- [ ] Add new variable: `FRONTEND_URL` = your frontend URL
- [ ] Update code to use this variable
- [ ] Redeploy

---

### **PART 5: Seed Sample Events (2 minutes)**

#### Step 5.1: Create Sample Events
Use one of these methods:

**Method 1: Using Browser**
- [ ] Open: `https://your-backend-url.vercel.app/api/seed/events`
- [ ] Use a REST client or Postman
- [ ] Send POST request

**Method 2: Using curl**
```bash
curl -X POST https://your-backend-url.vercel.app/api/seed/events
```

- [ ] Should see: `"12 sample events created successfully!"`

---

### **PART 6: Test Your App (5 minutes)**

#### Step 6.1: Open Your App
- [ ] Visit your frontend URL: `https://your-frontend-url.vercel.app`
- [ ] Should see the Eventix homepage with dark theme

#### Step 6.2: Test Registration
- [ ] Click "Register"
- [ ] Enter: Name, Email (any email), Password
- [ ] Click "Register"
- [ ] Should register instantly (no OTP needed)
- [ ] Should redirect to events page

#### Step 6.3: Test Events
- [ ] Go to "Events" page
- [ ] Should see 12 sample events
- [ ] Cards should have floating animations
- [ ] Try filtering by category

#### Step 6.4: Test Booking
- [ ] Click on any event card
- [ ] Should see event details
- [ ] Select number of tickets
- [ ] Click "Book Now"
- [ ] Should see success message

#### Step 6.5: Test My Bookings
- [ ] Click "My Bookings" in navbar
- [ ] Should see your booking
- [ ] Try canceling a booking

---

## 🎉 Success Criteria

Your deployment is successful if:
- [ ] ✅ Backend URL works and shows welcome message
- [ ] ✅ Frontend URL loads with dark theme
- [ ] ✅ Can register new account
- [ ] ✅ Can login
- [ ] ✅ Can see events
- [ ] ✅ Can book tickets
- [ ] ✅ Can view bookings
- [ ] ✅ Animations are smooth

---

## 📝 Your Deployment URLs

Fill these in as you deploy:

```
Backend URL:  https://_________________________________.vercel.app
Frontend URL: https://_________________________________.vercel.app
MongoDB URI:  mongodb+srv://eventix_user:________@cluster0._____.mongodb.net/eventix
```

---

## 🆘 Common Issues & Solutions

### Issue 1: "Application Error" on Backend
**Solution**: 
- Check Vercel logs (Deployments → View Function Logs)
- Verify MongoDB connection string is correct
- Ensure all environment variables are set

### Issue 2: Frontend shows "Failed to fetch"
**Solution**:
- Check if `VITE_API_URL` is set correctly
- Should end with `/api`
- Redeploy frontend after fixing

### Issue 3: CORS Error
**Solution**:
- Update CORS origin in `backend/server.js`
- Add your frontend URL
- Push changes to GitHub

### Issue 4: MongoDB Connection Failed
**Solution**:
- Check if 0.0.0.0/0 is whitelisted in MongoDB Atlas
- Verify password doesn't have special characters
- Test connection string locally first

---

## 🔗 Important Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **MongoDB Atlas**: https://cloud.mongodb.com/
- **GitHub Repo**: https://github.com/ayushgupta-h/Eventix
- **Deployment Guide**: See VERCEL_DEPLOYMENT.md for detailed instructions

---

## ⏱️ Total Time: ~20 minutes

- MongoDB Setup: 5 min
- Backend Deploy: 5 min
- Frontend Deploy: 5 min
- CORS Update: 2 min
- Seed Data: 2 min
- Testing: 5 min

---

**Ready to deploy? Start with Part 1! 🚀**
