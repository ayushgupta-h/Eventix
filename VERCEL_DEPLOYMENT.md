# 🚀 Vercel Deployment Guide for Eventix

## Prerequisites
- ✅ GitHub account with your code pushed
- ✅ Vercel account (sign up at https://vercel.com)
- ✅ MongoDB Atlas account (for production database)

---

## 📋 Step-by-Step Deployment

### **STEP 1: Set Up MongoDB Atlas (Production Database)**

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com/
2. **Login** to your account
3. **Create a New Cluster** (if you haven't already)
   - Click "Build a Database"
   - Choose "Free" tier (M0)
   - Select a region close to you
   - Click "Create"

4. **Create Database User**:
   - Go to "Database Access" (left sidebar)
   - Click "Add New Database User"
   - Username: `eventix_user`
   - Password: Generate a strong password (SAVE THIS!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

5. **Whitelist All IPs** (for Vercel):
   - Go to "Network Access" (left sidebar)
   - Click "Add IP Address"
   - Click "ALLOW ACCESS FROM ANYWHERE" (0.0.0.0/0)
   - Click "Confirm"
   - Wait 2-3 minutes

6. **Get Connection String**:
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://eventix_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<password>` with your actual password
   - Add database name: `mongodb+srv://eventix_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/eventix?retryWrites=true&w=majority`
   - **SAVE THIS CONNECTION STRING!**

---

### **STEP 2: Deploy Backend to Vercel**

1. **Go to Vercel**: https://vercel.com/
2. **Sign in** with GitHub
3. **Click "Add New"** → "Project"
4. **Import your repository**: `ayushgupta-h/Eventix`
5. **Configure Project**:
   - **Framework Preset**: Other
   - **Root Directory**: Click "Edit" → Select `backend`
   - **Build Command**: Leave empty or `npm install`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

6. **Add Environment Variables** (IMPORTANT!):
   Click "Environment Variables" and add these:

   ```
   PORT = 5000
   MONGODB_URI = mongodb+srv://eventix_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/eventix?retryWrites=true&w=majority
   JWT_SECRET = your_super_secret_jwt_key_change_this_to_something_random
   JWT_EXPIRE = 7d
   NODE_ENV = production
   EMAIL_HOST = smtp.gmail.com
   EMAIL_PORT = 587
   EMAIL_USER = your_email@gmail.com
   EMAIL_PASS = your_gmail_app_password
   ```

   **Important**: 
   - Replace `YOUR_PASSWORD` with your MongoDB password
   - Replace `JWT_SECRET` with a random string (at least 32 characters)
   - Email variables are optional if you're not using email features

7. **Click "Deploy"**
8. **Wait for deployment** (2-3 minutes)
9. **Copy your backend URL**: It will be something like `https://eventix-backend.vercel.app`
10. **Test it**: Visit `https://your-backend-url.vercel.app/` - you should see:
    ```json
    {
      "message": "Welcome to Eventix API",
      "version": "1.0.0"
    }
    ```

---

### **STEP 3: Deploy Frontend to Vercel**

1. **Go back to Vercel Dashboard**
2. **Click "Add New"** → "Project"
3. **Import the SAME repository**: `ayushgupta-h/Eventix`
4. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: Click "Edit" → Select `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Add Environment Variables**:
   Click "Environment Variables" and add:

   ```
   VITE_API_URL = https://your-backend-url.vercel.app/api
   ```

   **Important**: Replace `your-backend-url` with your actual backend URL from Step 2

6. **Click "Deploy"**
7. **Wait for deployment** (2-3 minutes)
8. **Copy your frontend URL**: It will be something like `https://eventix.vercel.app`

---

### **STEP 4: Update CORS in Backend**

1. **Go to your backend project** in Vercel
2. **Go to Settings** → "Environment Variables"
3. **Find the deployed backend URL** (e.g., `https://eventix-backend.vercel.app`)
4. **Update CORS** in your code:
   - Edit `backend/server.js` locally
   - Update the CORS origin to include your frontend URL:
   ```javascript
   const corsOptions = {
     origin: ['https://eventix.vercel.app', 'https://your-frontend-url.vercel.app'],
     credentials: true,
   };
   ```
5. **Commit and push**:
   ```bash
   git add .
   git commit -m "Update CORS for production"
   git push
   ```
6. **Vercel will auto-deploy** the changes

---

### **STEP 5: Seed Sample Events (Optional)**

1. **Open your browser**
2. **Visit**: `https://your-backend-url.vercel.app/api/seed/events`
3. **Use a tool like Postman** or **curl**:
   ```bash
   curl -X POST https://your-backend-url.vercel.app/api/seed/events
   ```
4. **This will create 12 sample events** in your database

---

### **STEP 6: Test Your Deployed App**

1. **Visit your frontend URL**: `https://eventix.vercel.app`
2. **Test Registration**:
   - Click "Register"
   - Enter any email and password
   - Should register instantly (no OTP needed)
3. **Test Login**:
   - Login with your credentials
4. **Test Events**:
   - Go to "Events" page
   - Should see sample events (if you seeded them)
5. **Test Booking**:
   - Click on an event
   - Book tickets
   - Check "My Bookings"

---

## 🔧 Troubleshooting

### Backend Issues

**Problem**: "Application Error" or 500 error
- **Solution**: Check Vercel logs
  - Go to your backend project → "Deployments"
  - Click on latest deployment → "View Function Logs"
  - Look for errors

**Problem**: MongoDB connection failed
- **Solution**: 
  - Verify MongoDB connection string in environment variables
  - Check if IP 0.0.0.0/0 is whitelisted in MongoDB Atlas
  - Ensure password doesn't have special characters (or URL encode them)

**Problem**: CORS errors
- **Solution**: 
  - Update CORS origin in `backend/server.js`
  - Add your frontend URL to allowed origins
  - Redeploy backend

### Frontend Issues

**Problem**: "Failed to fetch" or API errors
- **Solution**: 
  - Check if `VITE_API_URL` is set correctly
  - Should be: `https://your-backend-url.vercel.app/api`
  - Redeploy frontend after fixing

**Problem**: Blank page
- **Solution**: 
  - Check browser console for errors
  - Verify build completed successfully in Vercel logs

---

## 📝 Important Notes

### Environment Variables
- ✅ Backend needs: `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV`
- ✅ Frontend needs: `VITE_API_URL`
- ⚠️ Never commit `.env` files to GitHub
- ✅ Use Vercel's environment variables interface

### MongoDB Atlas
- ✅ Use MongoDB Atlas for production (not local MongoDB)
- ✅ Whitelist 0.0.0.0/0 for Vercel
- ✅ Use strong passwords
- ✅ Create separate database for production

### Vercel Limits (Free Tier)
- ⚠️ Serverless functions timeout after 10 seconds
- ⚠️ 100GB bandwidth per month
- ⚠️ Functions have cold starts (first request may be slow)

---

## 🎯 Quick Checklist

Before deploying, ensure:
- [ ] Code is pushed to GitHub
- [ ] MongoDB Atlas cluster is created
- [ ] Database user is created
- [ ] Network access allows 0.0.0.0/0
- [ ] Connection string is ready
- [ ] JWT_SECRET is generated
- [ ] Backend deployed first
- [ ] Backend URL is copied
- [ ] Frontend environment variable is set
- [ ] Frontend deployed
- [ ] CORS is updated
- [ ] Sample events are seeded
- [ ] App is tested

---

## 🎉 Success!

Once deployed, you'll have:
- ✅ Backend API: `https://eventix-backend.vercel.app`
- ✅ Frontend App: `https://eventix.vercel.app`
- ✅ MongoDB Atlas: Production database
- ✅ Auto-deployments: Push to GitHub = Auto deploy

---

## 🔗 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **MongoDB Atlas**: https://cloud.mongodb.com/
- **Vercel Docs**: https://vercel.com/docs
- **Your GitHub Repo**: https://github.com/ayushgupta-h/Eventix

---

## 💡 Pro Tips

1. **Custom Domain**: Add a custom domain in Vercel settings
2. **Analytics**: Enable Vercel Analytics for insights
3. **Monitoring**: Use Vercel logs to monitor errors
4. **Environment**: Use different MongoDB databases for dev/prod
5. **Secrets**: Rotate JWT_SECRET regularly for security

---

## 🆘 Need Help?

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for frontend errors
3. Verify all environment variables are set
4. Test backend API endpoints directly
5. Check MongoDB Atlas connection

---

**Good luck with your deployment! 🚀**
