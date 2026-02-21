# Fix Render Database Connection Issue

## Problem
```
bad auth : authentication failed
❌ Database connection failed
```

## Solution Steps

### Step 1: Fix MongoDB Atlas Settings

1. **Go to MongoDB Atlas** (https://cloud.mongodb.com)
2. **Click "Network Access"** (left sidebar)
3. **Add IP Address**:
   - Click "ADD IP ADDRESS"
   - Choose "ALLOW ACCESS FROM ANYWHERE" (0.0.0.0/0)
   - Click "Confirm"
   - Wait 2-3 minutes for changes to apply

### Step 2: Get Correct MongoDB Connection String

1. In MongoDB Atlas, click **"Database"** → **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Copy the connection string (format below)
4. **IMPORTANT**: Replace `<password>` with your actual database password

**Correct Format:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/studynotion?retryWrites=true&w=majority&tls=true
```

### Step 3: Update Render Environment Variables

1. **Go to Render Dashboard**: https://dashboard.render.com
2. Click on your **"studypoint-1-r4wb"** service
3. Click **"Environment"** in the left sidebar
4. Find **"MONGODB_URL"** variable
5. Click **"Edit"** and paste the NEW connection string
6. Make sure to replace `<password>` with your actual password
7. Click **"Save Changes"**

### Step 4: Redeploy

After updating the environment variable:
- Render will automatically redeploy
- Wait 2-3 minutes
- Check logs to verify: "✅ Database connected successfully"

## Common Issues

### Issue 1: Password contains special characters
If your password has special characters like `@`, `#`, `!`, `%`, encode them:
- `@` → `%40`
- `#` → `%23`
- `!` → `%21`
- `%` → `%25`

### Issue 2: Wrong database name
Make sure the database name is included in the connection string:
```
...mongodb.net/studynotion?retryWrites=true...
                ^^^^^^^^^^^
```

## Verify Local .env Works

Your local server works fine, so compare:
```bash
cat server/.env
```

Make sure Render has the SAME connection string as your local `.env` file!
