# 🔧 MongoDB Connection Fix Guide

## Current Error
```
Error: querySrv ECONNREFUSED _mongodb._tcp.cluster0.tvzqde5.mongodb.net
```

## Solution Steps

### Step 1: Whitelist Your IP in MongoDB Atlas

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com/
2. **Login** with your credentials (aaayushgupta26_db_user)
3. **Click on your project** (should see Cluster0)
4. **Click "Network Access"** in the left sidebar (under Security)
5. **Check if any IP addresses are listed**
   - If empty or only specific IPs → This is the problem!
6. **Click "ADD IP ADDRESS"** button (green button)
7. **Choose one of these options:**

   **Option A - Allow from Anywhere (Easiest for Development):**
   - Click "ALLOW ACCESS FROM ANYWHERE"
   - This adds `0.0.0.0/0` to the whitelist
   - Click "Confirm"

   **Option B - Add Your Current IP:**
   - Click "ADD CURRENT IP ADDRESS"
   - It will auto-detect your IP
   - Click "Confirm"

8. **Wait 2-3 minutes** for changes to propagate
9. **Check your backend terminal** - it should connect automatically!

### Step 2: Verify Database User Exists

1. In MongoDB Atlas, click **"Database Access"** (left sidebar)
2. Check if user `aaayushgupta26_db_user` exists
3. If not, create it:
   - Click "ADD NEW DATABASE USER"
   - Username: `aaayushgupta26_db_user`
   - Password: `gfOQJWZbCJ1U05zT`
   - Database User Privileges: "Atlas admin"
   - Click "Add User"

### Step 3: Check Your Internet Connection

Try this command to test DNS resolution:
```bash
nslookup cluster0.tvzqde5.mongodb.net
```

If this fails, you might have:
- Firewall blocking MongoDB ports (27017)
- VPN interfering with connection
- DNS issues

### Step 4: Alternative - Use MongoDB Connection String Format

If Atlas doesn't work, try the standard connection string format.

Update your `.env` file:
```env
MONGODB_URI=mongodb+srv://aaayushgupta26_db_user:gfOQJWZbCJ1U05zT@cluster0.tvzqde5.mongodb.net/eventix?retryWrites=true&w=majority
```

### Step 5: Try Without DNS (Direct Connection)

If DNS is the issue, get the direct IP:

1. In MongoDB Atlas → Clusters
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string
5. Replace in your `.env` file

## Alternative: Use Local MongoDB

If MongoDB Atlas continues to fail, install MongoDB locally:

### Windows:
1. Download: https://www.mongodb.com/try/download/community
2. Install MongoDB Community Server
3. Update `.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/eventix
   ```

### Mac (using Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

Update `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/eventix
```

## How to Know It's Fixed

You'll see this in your backend terminal:
```
MongoDB Connected: cluster0.tvzqde5.mongodb.net
Database Name: eventix
Server running in development mode on port 5000
```

## Still Not Working?

### Check Firewall (Windows):
1. Open Windows Defender Firewall
2. Click "Allow an app through firewall"
3. Make sure Node.js is allowed

### Disable VPN Temporarily:
If you're using a VPN, try disconnecting it temporarily to test.

### Check Antivirus:
Some antivirus software blocks MongoDB connections. Try disabling temporarily.

## Quick Test

Once you think it's fixed, test the connection:

Visit: http://localhost:5000/

You should see:
```json
{
  "message": "Welcome to Eventix API",
  "version": "1.0.0"
}
```

If you see this, the server is running! If MongoDB is connected, you can then:

1. Create sample events: http://localhost:5000/api/seed/events
2. View events: http://localhost:5000/api/events

## Need More Help?

If none of these work, the issue might be:
- Corporate/School network blocking MongoDB
- ISP blocking certain ports
- Regional restrictions

In that case, consider:
- Using a different network (mobile hotspot)
- Using MongoDB local installation
- Using a different cloud database (like MongoDB on Railway or Render)
