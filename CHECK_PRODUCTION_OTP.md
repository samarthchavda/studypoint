# 🔍 Production OTP Issue - Debugging Guide

## Current Setup
- **Frontend**: Vercel
- **Backend**: Render (https://studypoint-1-r4wb.onrender.com)
- **Issue**: OTP not sending on live website

## Common Causes & Solutions

### 1. ❌ Missing Email Credentials on Render

**Check if these are set in Render:**
Go to: https://dashboard.render.com → Your Service → Environment

Required variables:
```
MAIL_HOST=smtp.gmail.com
MAIL_USER=chavdasamarth007@gmail.com
MAIL_PASS=your_16_character_app_password
```

**How to fix:**
1. Go to Render Dashboard
2. Select your backend service
3. Go to "Environment" tab
4. Add/Update these variables
5. Click "Save Changes"
6. **Important**: Render will auto-redeploy after changes

### 2. ❌ CORS Issue - Frontend URL Not Allowed

**Check FRONTEND_URL in Render:**
```
FRONTEND_URL=https://your-actual-vercel-url.vercel.app
```

**How to fix:**
1. Get your actual Vercel URL (e.g., https://studynotion-app-rho.vercel.app)
2. Update FRONTEND_URL in Render environment variables
3. Make sure there's NO trailing slash

### 3. ❌ Wrong Backend URL in Vercel

**Check in Vercel Environment Variables:**
```
REACT_APP_BASE_URL=https://studypoint-1-r4wb.onrender.com/api/v1
```

**How to fix:**
1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Update or add REACT_APP_BASE_URL
5. Redeploy the frontend

### 4. ❌ Gmail App Password Not Working

**Symptoms:**
- "Invalid credentials" error
- "Authentication failed" in logs

**How to fix:**
1. Generate NEW App Password:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and device "Other"
   - Copy the 16-character password (no spaces!)
2. Update MAIL_PASS in Render
3. Wait for auto-redeploy

### 5. ❌ Render Service Sleeping (Free Tier)

**Symptoms:**
- First request takes 30+ seconds
- Timeout errors

**How to fix:**
- Free tier sleeps after inactivity
- First request wakes it up (wait 30-60 seconds)
- Or upgrade to paid plan ($7/month for always-on)

---

## 🧪 Quick Test Commands

### Test 1: Check if Backend is Running
```bash
curl https://studypoint-1-r4wb.onrender.com/api/v1/health
```
Expected: `{"success": true, "message": "API is working"}`

### Test 2: Test OTP Endpoint Directly
```bash
curl -X POST https://studypoint-1-r4wb.onrender.com/api/v1/auth/sendotp \
  -H "Content-Type: application/json" \
  -d '{"email":"your-test-email@gmail.com"}'
```
Expected: `{"success": true, "message": "OTP sent successfully..."}`

### Test 3: Check Render Logs
1. Go to Render Dashboard
2. Select your service
3. Click "Logs" tab
4. Try sending OTP from frontend
5. Watch for errors in logs

---

## 📋 Step-by-Step Verification Checklist

### On Render Dashboard:

- [ ] Service is running (green status)
- [ ] MAIL_HOST = `smtp.gmail.com`
- [ ] MAIL_USER = `chavdasamarth007@gmail.com` (or your email)
- [ ] MAIL_PASS = `16-character app password` (not empty)
- [ ] FRONTEND_URL = `your vercel URL` (no trailing slash)
- [ ] MONGODB_URL is set correctly
- [ ] JWT_SECRET is set
- [ ] Latest deployment is live (check deploy date)

### On Vercel Dashboard:

- [ ] Project is deployed successfully
- [ ] REACT_APP_BASE_URL = `https://studypoint-1-r4wb.onrender.com/api/v1`
- [ ] No build errors
- [ ] Latest commit is deployed

---

## 🔧 Quick Fix Script

Run this from your local machine to test the live backend:

```bash
# Test backend health
echo "Testing backend health..."
curl https://studypoint-1-r4wb.onrender.com/api/v1/health
echo "\n"

# Test OTP endpoint (replace with your email)
echo "Testing OTP endpoint..."
curl -X POST https://studypoint-1-r4wb.onrender.com/api/v1/auth/sendotp \
  -H "Content-Type: application/json" \
  -d '{"email":"chavdasamarth02@gmail.com"}' \
  -v
```

---

## 🐛 Debug Mode - Enable Detailed Logs

If still not working, check Render logs for these messages:

**Good logs (working):**
```
✅ Email sent successfully to: user@example.com
OTP document created successfully
✅ OTP email sent successfully
```

**Bad logs (not working):**
```
❌ mailSender: error sending mail
❌ Mail credentials not configured
❌ Error while generating/sending OTP
```

---

## 🆘 Still Not Working?

### Option A: Check Frontend Console
1. Open your Vercel site
2. Open browser DevTools (F12)
3. Go to Console tab
4. Try sending OTP
5. Look for API errors

### Option B: Check Network Tab
1. Open DevTools → Network tab
2. Try sending OTP
3. Find the `/sendotp` request
4. Check:
   - Status code (should be 200)
   - Response body
   - Request URL (should point to Render)

### Option C: Render Logs
1. Render Dashboard → Your Service → Logs
2. Click "Live" to see real-time logs
3. Try sending OTP from frontend
4. Copy any error messages you see

---

## 💡 Most Common Fix

**99% of the time it's one of these:**

1. **Missing MAIL_PASS on Render** → Add Gmail App Password
2. **Wrong FRONTEND_URL on Render** → Update to actual Vercel URL
3. **Wrong REACT_APP_BASE_URL on Vercel** → Update to Render URL with /api/v1
4. **Render service sleeping** → Wait 30-60 seconds for first request

---

## ✅ After Fixing

1. **Redeploy if needed:**
   - Render: Auto-redeploys when env vars change
   - Vercel: Manual redeploy if you changed env vars

2. **Clear browser cache:** Ctrl+Shift+R (hard refresh)

3. **Test signup:** Try sending OTP again

4. **Check email:** Look in inbox AND spam folder

---

## 📞 Need More Help?

If still stuck, collect this info:
1. Render logs (copy the full error)
2. Browser console errors
3. Network tab screenshot showing the API call
4. Screenshot of Render environment variables (hide sensitive values)
