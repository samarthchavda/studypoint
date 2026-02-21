# 🚀 QUICK START - SMS OTP IN 5 MINUTES

## Step 1️⃣: Get Twilio Credentials (2 minutes)

You already have the Twilio console open! 

**From your current browser tab:**
1. **Account SID:** Copy from "Live credentials" section → `AC29876...`
2. **Auth Token:** Click 👁️ eye icon to reveal → Copy entire token
3. **Phone Number:** Go to "Phone Numbers" > "Manage" → Copy your number → `+1234567890`

---

## Step 2️⃣: Update `.env` File (1 minute)

Open: `/Users/chavdasamarth/Desktop/Projects/Sem-8/StudyNotion-main/server/.env`

Add at the end:
```env
# ========= TWILIO SMS CREDENTIALS =========
TWILIO_ACCOUNT_SID=AC29876...
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

**Save the file!** ⌘S (or Ctrl+S)

---

## Step 3️⃣: Restart Backend Server (1 minute)

```bash
# Press Ctrl+C to stop the current server
# Then run:
cd /Users/chavdasamarth/Desktop/Projects/Sem-8/StudyNotion-main/server
npm run dev
```

Expect to see:
```
✅ Server running on port 4000...
```

---

## Step 4️⃣: Test SMS OTP (1 minute)

**Option A: Using Postman (Recommended)**
1. Open Postman
2. Create **POST** request
3. URL: `http://localhost:4000/api/v1/auth/sendotp`
4. Headers: `Content-Type: application/json`
5. Body (raw JSON):
```json
{
  "phoneNumber": "+1234567890",
  "sendMethod": "sms"
}
```
6. Click **Send** 
7. You'll get OTP code back
8. **Check your phone!** 📱 You should see SMS with OTP!

**Option B: Using cURL**
```bash
curl -X POST http://localhost:4000/api/v1/auth/sendotp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"+1234567890","sendMethod":"sms"}'
```

---

## ✅ If SMS Arrives - You're Done! 🎉

SMS sent successfully? Congratulations! Your SMS OTP is working.

Now you can:
- Update your frontend to use phone number instead of email
- Users will get OTP on their SMS instead of email
- Keep email OTP as backup fallback

---

## ❌ If SMS Doesn't Arrive - Troubleshoot

| Error | Fix |
|-------|-----|
| "Missing Twilio credentials" | Check `.env` file, make sure all 3 variables are there, restart server |
| "Invalid phone number" | Phone number must be real (for development too), format: `+1234567890` |
| Error in server logs | Copy full error, search in `SMS_OTP_SETUP.md` |

---

## 📋 Files Changed

✅ Created:
- `server/utils/smsSender.js` - Sends SMS via Twilio
- `server/test-sms-otp.js` - Test file
- `SMS_OTP_SETUP.md` - Full documentation
- `TWILIO_CREDENTIALS_GUIDE.md` - Where to get credentials

✅ Modified:
- `server/.env` - Added Twilio credentials
- `server/models/OTP.js` - Added SMS support
- `server/models/User.js` - Added phoneNumber field
- `server/controllers/auth.js` - Updated sendOTP and signup

---

## 🔗 API Endpoints Now Available

### Send OTP via SMS:
```
POST /api/v1/auth/sendotp
Body: {"phoneNumber": "+1234567890", "sendMethod": "sms"}
```

### Send OTP via Email (Still works):
```
POST /api/v1/auth/sendotp
Body: {"email": "user@example.com", "sendMethod": "email"}
```

### Signup with SMS OTP:
```
POST /api/v1/auth/signup
Body: {
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phoneNumber": "+1234567890",
  "password": "Secure@123",
  "confirmPassword": "Secure@123",
  "accountType": "Student",
  "otp": "123456"
}
```

---

## 🎯 Next: Update Frontend

When SMS OTP is working, update your React frontend to:
1. Ask for phone number instead of email
2. Send phone number to `/api/v1/auth/sendotp`
3. User gets SMS with OTP
4. Send phone number + OTP to `/api/v1/auth/signup`

See `SMS_OTP_SETUP.md` for complete API details.

---

## 💬 Need Help?

Check these files in order:
1. **Credentials issue?** → `TWILIO_CREDENTIALS_GUIDE.md`
2. **Setup issue?** → `SMS_OTP_SETUP.md`
3. **API issue?** → `SMS_OTP_SETUP.md` (API Endpoints section)

---

**That's it! You now have SMS OTP working in your app! 🎉**
