# 🚨 OTP Not Sending on Vercel - Quick Checklist

## The Problem
- ✅ Works on: `localhost`
- ❌ Broken on: `Vercel deployment` (production)
- 🎯 Root cause: **Backend email configuration on Render**

---

## 📋 QUICK FIX CHECKLIST

### Step 1: Check Render Environment Variables ⚡
Go to: https://dashboard.render.com → Your Service → **Environment** tab

**Required variables:**
- [ ] `MAIL_HOST` = `smtp.gmail.com`
- [ ] `MAIL_USER` = `chavdasamarth007@gmail.com`
- [ ] `MAIL_PASS` = `your-16-char-app-password` ← **Most common issue!**
- [ ] `NODE_ENV` = `production`
- [ ] `MONGODB_URL` = `your-connection-string`

### Step 2: Get Gmail App Password
If `MAIL_PASS` is missing or old:
1. Visit: https://myaccount.google.com/apppasswords
2. Create new app password (Mail → Other)
3. Copy the 16-character code (no spaces)
4. Update `MAIL_PASS` in Render
5. Save (Render auto-redeploys)

### Step 3: OR Use SendGrid (Better Option)
If Gmail still doesn't work:
1. Sign up: https://signup.sendgrid.com
2. Create API key (Settings → API Keys)
3. Verify sender email
4. Add to Render:
   - Name: `SENDGRID_API_KEY`
   - Value: `SG.xxxxx...`
5. Save and wait for redeploy

---

## 🧪 Test Your Fix

### Method 1: Run Test Script
```bash
./test-production-otp-quick.sh
```

### Method 2: Manual Test
```bash
curl -X POST https://studypoint-1-r4wb.onrender.com/api/v1/auth/sendotp \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@gmail.com"}'
```

### Method 3: Check Render Logs
1. Go to Render Dashboard
2. Click on your service
3. Click "Logs" tab
4. Try sending OTP from website
5. Look for error messages

---

## 🎯 Expected Results

**Success looks like:**
```json
{
  "success": true,
  "message": "OTP sent successfully to your email"
}
```

**Failure looks like:**
```json
{
  "success": false,
  "message": "Failed to send OTP..."
}
```

---

## ⚠️ Common Issues

| Issue | Solution |
|-------|----------|
| "Invalid credentials" | Update `MAIL_PASS` with new app password |
| "Connection timeout" | Use SendGrid instead of Gmail SMTP |
| "Service sleeping" | Wait 30-60s (free tier wakes up) |
| "sender not verified" | Complete SendGrid sender verification |

---

## 📊 Your Current Setup

**Frontend (Vercel):**
- URL: Your Vercel deployment
- Backend URL: `https://studypoint-1-r4wb.onrender.com/api/v1`
- Status: ✅ Configured correctly

**Backend (Render):**
- URL: `https://studypoint-1-r4wb.onrender.com`
- Status: ⚠️ Needs email credentials update

---

## ✅ After Fixing

1. Save changes in Render
2. Wait 2-3 minutes for auto-redeploy
3. Visit your Vercel site
4. Try signup with OTP
5. Check email (and spam folder)
6. Success! 🎉

---

## 📝 Need More Help?

- **Detailed Guide**: See `PRODUCTION_OTP_FIX.md`
- **SendGrid Setup**: See `SENDGRID_SETUP.md`
- **Render Logs**: https://dashboard.render.com → Logs

---

**TIP:** 90% of the time, it's just missing/wrong `MAIL_PASS` in Render!
