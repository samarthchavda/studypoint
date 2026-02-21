# 🔑 How to Get Your OTP (Current Setup)

## Quick Answer

**Your OTP is displayed in the terminal/console where you ran `npm run dev`**

---

## Step-by-Step Guide

### Step 1: Make Sure Servers Are Running

Open terminal and run:
```bash
cd StudyNotion-main
npm run dev
```

You should see:
```
[server] ✅ Server is running on port 4000
[client] ✅ Compiled successfully!
```

### Step 2: Request OTP from the App

1. Open http://localhost:3000/signup
2. Fill in your details:
   - Phone: 8320709174 (or your 10-digit number)
   - Email: chavdasamarth02@gmail.com
   - Name, Password, etc.
3. Click **"Send OTP"** button

### Step 3: Check Your Terminal

Go back to the terminal where `npm run dev` is running.

Scroll down and look for this section (it will be in YELLOW color with [server] prefix):

```
[server] 🔑 ========================================
[server] 🔑 DEVELOPMENT MODE - OTP FOR TESTING
[server] 🔑 Phone: +918320709174
[server] 🔑 OTP: 478443
[server] 🔑 ========================================
```

### Step 4: Copy the OTP

Copy the 6-digit OTP number (e.g., 478443)

### Step 5: Enter OTP in the App

1. Go back to the browser (http://localhost:3000/signup)
2. Paste the OTP in the OTP field
3. Complete the signup

---

## Visual Example

```
Terminal Output:
┌─────────────────────────────────────────┐
│ [server] Attempting to send SMS...     │
│ [server] ❌ SMS failed (Twilio trial)  │
│                                         │
│ [server] 🔑 ========================== │
│ [server] 🔑 DEVELOPMENT MODE          │
│ [server] 🔑 Phone: +918320709174      │
│ [server] 🔑 OTP: 478443    ← COPY THIS│
│ [server] 🔑 ========================== │
└─────────────────────────────────────────┘
```

---

## Alternative: Use Test Script

You can also get the OTP using the test script:

```bash
cd StudyNotion-main
node test-otp-signup.js
```

Output will show:
```
✅ OTP sent successfully!
🔑 OTP (for testing): 478443
```

---

## Why SMS Doesn't Work

**Reason**: Twilio trial account requires phone verification

**Solutions**:
1. ✅ **Use Console OTP** (Current - Working)
2. 📱 **Verify Phone in Twilio** (See VERIFY_PHONE_TWILIO.md)
3. 📧 **Switch to Email OTP** (See SWITCH_TO_EMAIL_OTP.md)
4. 💳 **Upgrade Twilio** (Paid option)

---

## Quick Test

Run this now to see your OTP:

```bash
cd StudyNotion-main
node test-otp-signup.js
```

The OTP will be displayed immediately!

---

## Need Real SMS?

If you want to receive OTP on your phone via SMS:

1. **Verify your phone in Twilio** (FREE - 2 minutes)
   - Go to https://console.twilio.com/us1/develop/phone-numbers/manage/verified
   - Add +918320709174
   - Verify with the code they send
   - Done! SMS will work

2. **Or upgrade Twilio** (PAID - ~$1/month)
   - Add payment method
   - SMS works for all numbers

---

## Current Status

✅ **OTP Generation**: Working
✅ **OTP Storage**: Working (saved to database)
✅ **OTP Display**: Working (shown in console)
✅ **Signup**: Working (use console OTP)
✅ **Login**: Working

❌ **SMS Delivery**: Not working (Twilio trial limitation)

**Workaround**: Use OTP from console (already working!)
