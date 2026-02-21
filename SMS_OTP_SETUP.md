# 📱 SMS OTP Setup with Twilio - Complete Guide

## Overview
This guide shows you how to set up SMS OTP (One-Time Password) verification using Twilio instead of email OTP.

---

## 🔐 **Getting Twilio API Credentials**

### Step 1: Create Twilio Account
1. Go to: https://www.twilio.com/
2. Click **"Sign Up"** button
3. Fill in your details:
   - Phone number
   - Email
   - Password
4. Verify your phone number with SMS

### Step 2: Get Account SID & Auth Token
1. Login to Twilio Console: https://console.twilio.com
2. On the dashboard, you'll see:
   - **Account SID** (shown directly)
   - **Auth Token** (click the eye icon 👁️ to reveal)
3. Copy both values

### Step 3: Get Twilio Phone Number
1. Go to **Phone Numbers** → **Manage** in left sidebar
2. Click **"Buy a Phone Number"** (or use the trial number provided)
3. Select country (USA) and features:
   - ✅ SMS (important!)
   - Click **Search**
4. Select a number with SMS capability
5. Click **Buy** (trial: $1 cost, full: $1/month)
6. Copy the phone number (format: +1234567890)

---

## 📝 **Environment Variables Setup**

Add these to your `.env` file in the `/server` folder:

```env
# ========= TWILIO SMS CREDENTIALS =========
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

**⚠️ Important:** Keep these credentials SECRET! Never commit to git.

---

## 🔄 **API Endpoints**

### 1️⃣ **Send OTP via SMS**

**Endpoint:** `POST /api/v1/auth/sendotp`

**Request Body:**
```json
{
  "phoneNumber": "+1234567890",
  "sendMethod": "sms"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "OTP sent successfully via SMS",
  "contact": "+1234567890",
  "sendMethod": "sms",
  "otp": "123456"  // Only in development mode
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Phone number is required for SMS OTP"
}
```

---

### 2️⃣ **Send OTP via Email** (Still Available)

**Endpoint:** `POST /api/v1/auth/sendotp`

**Request Body:**
```json
{
  "email": "user@example.com",
  "sendMethod": "email"
}
```

---

### 3️⃣ **Signup with Phone OTP**

**Endpoint:** `POST /api/v1/auth/signup`

**Request Body:**
```json
{
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

## 🧪 **Testing SMS OTP**

### Test with cURL:
```bash
# Send OTP via SMS
curl -X POST http://localhost:4000/api/v1/auth/sendotp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"+1234567890","sendMethod":"sms"}'
```

### Test with Postman:
1. Open Postman
2. Create a new **POST** request
3. URL: `http://localhost:4000/api/v1/auth/sendotp`
4. Headers: `Content-Type: application/json`
5. Body:
   ```json
   {
     "phoneNumber": "+1234567890",
     "sendMethod": "sms"
   }
   ```
6. Click **Send**

### Test with Node.js:
```bash
cd /Users/chavdasamarth/Desktop/Projects/Sem-8/StudyNotion-main/server
npm test -- test-sms-otp.js
```

---

## 📱 **Phone Number Format**

Twilio requires phone numbers in **E.164 format**:

```
+[country code][phone number]

Examples:
- USA:      +1 201 555 0123
- India:    +91 98765 43210
- UK:       +44 20 7946 0958
- Canada:   +1 613 555 0144
```

---

## 🔧 **Files Changed/Created**

### New Files:
1. **`server/utils/smsSender.js`** - Twilio SMS sending utility
2. **`server/test-sms-otp.js`** - Test file for SMS OTP
3. **`SMS_OTP_SETUP.md`** - This documentation

### Modified Files:
1. **`server/.env`** - Added Twilio credentials
2. **`server/models/OTP.js`** - Added phone field and SMS sending logic
3. **`server/models/User.js`** - Added phoneNumber field
4. **`server/controllers/auth.js`** - Updated sendOTP and signup functions
5. **`server/package.json`** - Added twilio dependency

---

## 🚀 **Production Deployment**

### For Render:
1. Go to your Render dashboard
2. Select your backend service
3. Go to **Environment** tab
4. Add new variables:
   ```
   TWILIO_ACCOUNT_SID = ACxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN = your_auth_token_here
   TWILIO_PHONE_NUMBER = +1234567890
   ```
5. Click **Save Changes**
6. Wait for auto-redeploy

### For Vercel:
1. Go to your Vercel project settings
2. Go to **Environment Variables**
3. Add:
   ```
   Name: TWILIO_ACCOUNT_SID
   Value: ACxxxxxxxxxxxxxxxxxxxxxxxx
   
   Name: TWILIO_AUTH_TOKEN
   Value: your_auth_token_here
   
   Name: TWILIO_PHONE_NUMBER
   Value: +1234567890
   ```
4. Click **Save**
5. Redeploy

---

## ⚠️ **Twilio Pricing**

- **Free Trial:** $15 credits, includes test numbers
- **Production:** 
  - SMS: $0.0075 per outgoing SMS (USA)
  - Phone number: $1/month
  - 100 SMS OTPs = $0.75

---

## ✅ **Checklist**

- [ ] Twilio account created
- [ ] Account SID copied
- [ ] Auth Token copied
- [ ] Phone number obtained
- [ ] `.env` file updated with credentials
- [ ] `npm install twilio` completed
- [ ] Backend restarted
- [ ] SMS OTP tested via Postman/cURL
- [ ] Signup with SMS OTP tested
- [ ] Credentials added to Render/Vercel
- [ ] Production deployment tested

---

## 🐛 **Troubleshooting**

### SMS Not Sending?
```
Check:
1. TWILIO_ACCOUNT_SID is correct
2. TWILIO_AUTH_TOKEN is correct (has eye icon visibility)
3. TWILIO_PHONE_NUMBER is in E.164 format (+1234567890)
4. Phone number has SMS capability
5. Server logs for error messages
```

### Error: "Missing Twilio credentials"
```
→ Check .env file has all three variables
→ Restart the server after adding credentials
→ Check for typos in variable names
```

### Phone Number Invalid
```
→ Use E.164 format: +[country code][number]
→ No spaces or dashes
→ Must be a valid real phone number (for production)
```

### Twilio Trial Limits
```
- Can only send to verified phone numbers
- Go to Twilio Console → Verified Caller IDs
- Add and verify your test numbers first
```

---

## 📚 **References**

- Twilio Docs: https://www.twilio.com/docs/sms
- Account Creation: https://www.twilio.com/console
- Phone Numbers: https://www.twilio.com/console/phone-numbers/incoming
- E.164 Format: https://en.wikipedia.org/wiki/E.164

---

## 💡 **Tips**

1. **Development:** Use Twilio's demo credentials or trial account
2. **Testing:** Always use verified phone numbers in trial mode
3. **Security:** Store credentials in `.env`, never hardcode
4. **Fallback:** Keep email OTP as fallback if SMS fails
5. **Logs:** Check server logs for detailed error messages

---

Need help? Check the test file: `server/test-sms-otp.js`
