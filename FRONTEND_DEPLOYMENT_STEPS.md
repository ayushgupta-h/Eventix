# 🎨 Frontend Deployment Steps

## 📋 **Two-Step Process**

### **STEP 1: Deploy Backend First** ⚠️
You MUST deploy the backend first to get the backend URL!

---

### **STEP 2: Update Frontend .env.production**

Once you have your backend URL from Vercel (e.g., `https://eventix-backend-abc123.vercel.app`), update the frontend environment file.

---

## 🔧 **How to Update Frontend .env.production**

### **Current File Location:**
```
C:\Users\aaayu\OneDrive\Desktop\Eventix\Eventix-1\frontend\.env.production
```

### **What to Change:**

**BEFORE (Template):**
```env
VITE_API_URL=https://YOUR_BACKEND_URL.vercel.app/api
```

**AFTER (With Your Actual Backend URL):**
```env
VITE_API_URL=https://eventix-backend-abc123.vercel.app/api
```

⚠️ **IMPORTANT:** 
- Replace `eventix-backend-abc123` with your ACTUAL backend URL
- Keep `/api` at the end
- No trailing slash after `/api`

---

## 🎯 **Complete Workflow**

### **Phase 1: Deploy Backend**

1. ✅ Go to Vercel
2. ✅ Import your repository
3. ✅ Select `backend` as root directory
4. ✅ Import `backend/.env.production` file
5. ✅ Click "Deploy"
6. ✅ Wait for deployment (2-3 minutes)
7. ✅ **COPY YOUR BACKEND URL** (e.g., `https://eventix-backend-abc123.vercel.app`)

### **Phase 2: Update Frontend Environment**

8. ✅ Open `frontend/.env.production` file
9. ✅ Replace `YOUR_BACKEND_URL` with your actual backend URL
10. ✅ Save the file

### **Phase 3: Deploy Frontend**

11. ✅ Go to Vercel (new project)
12. ✅ Import same repository
13. ✅ Select `frontend` as root directory
14. ✅ Framework: **Vite**
15. ✅ Build Command: `npm run build`
16. ✅ Output Directory: `dist`
17. ✅ Import `frontend/.env.production` file
18. ✅ Click "Deploy"
19. ✅ Wait for deployment (2-3 minutes)
20. ✅ **COPY YOUR FRONTEND URL**

---

## 📝 **Example with Real URLs**

Let's say after deploying backend, you get:
```
Backend URL: https://eventix-backend-xyz789.vercel.app
```

Then your `frontend/.env.production` should be:
```env
VITE_API_URL=https://eventix-backend-xyz789.vercel.app/api
```

---

## ✅ **Quick Checklist**

**Before Deploying Frontend:**
- [ ] Backend is deployed successfully
- [ ] Backend URL is copied
- [ ] `frontend/.env.production` is updated with backend URL
- [ ] Backend URL ends with `/api`
- [ ] File is saved

**During Frontend Deployment:**
- [ ] Root directory: `frontend`
- [ ] Framework: Vite
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Environment variable imported

---

## 🎯 **Current Status**

### ✅ **Backend .env.production** - READY
Location: `backend/.env.production`
```env
PORT=5000
MONGODB_URI=mongodb+srv://aaayushgupta26_db_user:gfOQJWZbCJ1U05zT@cluster0.tvzqde5.mongodb.net/eventix?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=4dbab00ec1353d19f38421ae30db61db981189c4de1fb1caba9059adf8b3d1fc
JWT_EXPIRE=7d
NODE_ENV=production
```

### ⏳ **Frontend .env.production** - NEEDS BACKEND URL
Location: `frontend/.env.production`
```env
VITE_API_URL=https://YOUR_BACKEND_URL.vercel.app/api
```

**Action Required:** Update after backend deployment!

---

## 🚀 **What to Do Right Now**

1. **Deploy Backend First**
   - Use `backend/.env.production` (already ready!)
   - Get your backend URL

2. **Then Update Frontend**
   - Open `frontend/.env.production`
   - Replace `YOUR_BACKEND_URL` with actual URL
   - Save file

3. **Then Deploy Frontend**
   - Use updated `frontend/.env.production`

---

## 💡 **Pro Tip**

You can also add the environment variable directly in Vercel instead of importing the file:

**In Vercel Frontend Deployment:**
- Key: `VITE_API_URL`
- Value: `https://your-actual-backend-url.vercel.app/api`

---

## ⚠️ **Common Mistakes to Avoid**

❌ **Wrong:** `https://eventix-backend.vercel.app` (missing `/api`)
✅ **Correct:** `https://eventix-backend.vercel.app/api`

❌ **Wrong:** `https://eventix-backend.vercel.app/api/` (extra slash)
✅ **Correct:** `https://eventix-backend.vercel.app/api`

❌ **Wrong:** Using `http://` instead of `https://`
✅ **Correct:** Always use `https://` for Vercel URLs

---

## 🎉 **Summary**

**Right Now:**
- ✅ Backend `.env.production` is ready
- ⏳ Frontend `.env.production` needs backend URL

**Next Steps:**
1. Deploy backend
2. Copy backend URL
3. Update frontend `.env.production`
4. Deploy frontend

---

**Deploy backend first, then come back to update the frontend file! 🚀**
