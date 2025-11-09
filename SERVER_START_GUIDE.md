# 🚀 Server Startup Guide

## ✅ What I Fixed:

1. **Added Error Handlers** - Server won't crash on unexpected errors
2. **Port Conflict Resolution** - Automatically handles port 4000 conflicts
3. **Graceful Shutdown** - Proper cleanup when closing server
4. **Database Connection** - Better error handling and logging
5. **Safe Start Scripts** - Kills existing processes before starting

---

## 🎯 How to Start Server (3 Methods):

### Method 1: Safe Start (RECOMMENDED) ⭐
```bash
cd server
npm run safe-start
```
This will:
- Kill any existing process on port 4000
- Start server with nodemon (auto-restart on changes)

### Method 2: Using Shell Script
```bash
cd server
./start-server.sh
```

### Method 3: Manual Start
```bash
cd server
npm run dev
```

---

## 🛠️ If Server Still Crashes:

### Check 1: Kill Existing Process
```bash
lsof -ti:4000 | xargs kill -9
```

### Check 2: Verify .env File
Make sure `server/.env` has:
```
MONGODB_URL=mongodb://localhost:27017/studynotion
# or
MONGO_URI=mongodb://localhost:27017/studynotion

PORT=4000
JWT_SECRET=your_secret_key
```

### Check 3: Check MongoDB
```bash
# Check if MongoDB is running
brew services list | grep mongodb
# or
ps aux | grep mongod
```

### Check 4: View Server Logs
Server will now show detailed error messages with emojis:
- ✅ Success messages
- ❌ Error messages
- ⚠️ Warning messages
- 💡 Helpful tips

---

## 🔄 Complete Restart Process:

1. **Stop everything:**
```bash
# Kill backend
lsof -ti:4000 | xargs kill -9

# Kill frontend (if needed)
lsof -ti:3000 | xargs kill -9
```

2. **Start backend:**
```bash
cd server
npm run safe-start
```

3. **Start frontend (in new terminal):**
```bash
cd ../
npm start
```

---

## 📊 Server Features:

✅ Automatic crash prevention
✅ Port conflict resolution
✅ Database reconnection handling
✅ Graceful shutdown support
✅ Better error logging
✅ CORS configured for localhost:3000
✅ File upload support
✅ Cookie parser
✅ All routes protected

---

## 🎉 Server is Now Crash-Resistant!

The server will:
- ✅ Continue running even if errors occur
- ✅ Log errors instead of crashing
- ✅ Handle database disconnections
- ✅ Clean up properly on shutdown
- ✅ Show helpful error messages

**Just run: `npm run safe-start` and you're good to go!** 🚀
