# OTP Testing Guide - StudyNotion

## Problem Fixed ✅

The OTP sending was failing because:
1. **Twilio Trial Account Limitation**: The phone number +918320709174 needs to be verified in Twilio
2. **Solution**: Modified the code to work in development mode - OTP is now displayed in console and API response

## Current Status

- ✅ Frontend running on: http://localhost:3000
- ✅ Backend running on: http://localhost:4000
- ✅ OTP generation working
- ✅ OTP saved to database
- ⚠️ SMS delivery blocked (Twilio trial account - number not verified)
- ✅ OTP visible in console for testing

## How to Test Signup

### Option 1: Using the Web Interface

1. Open http://localhost:3000/signup
2. Fill in the form:
   - First Name: Chavda
   - Last Name: Samarth
   - Email: chavdasamarth02@gmail.com
   - Phone: +918320709174
   - Password: 12345678
   - Confirm Password: 12345678
   - Account Type: Student

3. Click "Send OTP"
4. Check the server console (terminal) for the OTP
5. Look for this section:
   ```
   🔑 ========================================
   🔑 DEVELOPMENT MODE - OTP FOR TESTING
   🔑 Phone: +918320709174
   🔑 OTP: XXXXXX
   🔑 ========================================
   ```
6. Enter the OTP in the signup form
7. Complete signup

### Option 2: Using Test Scripts

#### Test OTP Generation Only:
```bash
cd StudyNotion-main
node test-otp-signup.js
```

#### Test Complete Signup Flow:
```bash
cd StudyNotion-main
node test-complete-signup.js
```
This script will:
1. Send OTP request
2. Show you the OTP
3. Ask you to enter the OTP
4. Complete the signup

## Test Credentials

- **Phone**: +918320709174
- **Email**: chavdasamarth02@gmail.com
- **Password**: 12345678
- **First Name**: Chavda
- **Last Name**: Samarth
- **Account Type**: Student

## Latest OTP

The most recent OTP generated was: **785128**

(Note: OTPs expire after 5 minutes)

## To Fix SMS Delivery (For Production)

### Option 1: Verify Phone Number in Twilio (Free)
1. Go to https://console.twilio.com/
2. Navigate to Phone Numbers → Verified Caller IDs
3. Click "Add a new Caller ID"
4. Enter +918320709174
5. Complete verification process

### Option 2: Upgrade Twilio Account (Paid)
1. Add payment method to Twilio account
2. Purchase a phone number
3. SMS will work for all numbers

### Option 3: Use Email OTP Instead
- Modify the code to use email instead of SMS
- Email service (nodemailer) is already configured

## API Endpoints

### Send OTP
```bash
POST http://localhost:4000/api/v1/auth/sendotp
Content-Type: application/json

{
  "phoneNumber": "+918320709174"
}
```

### Signup
```bash
POST http://localhost:4000/api/v1/auth/signUp
Content-Type: application/json

{
  "firstName": "Chavda",
  "lastName": "Samarth",
  "email": "chavdasamarth02@gmail.com",
  "phoneNumber": "+918320709174",
  "password": "12345678",
  "confirmPassword": "12345678",
  "accountType": "Student",
  "otp": "785128"
}
```

## Troubleshooting

### OTP Not Showing in Console?
- Make sure the backend server is running
- Check the terminal where you ran `npm run dev`
- Look for the yellow `[server]` logs

### OTP Expired?
- OTPs expire after 5 minutes
- Request a new OTP by clicking "Send OTP" again

### Signup Fails?
- Make sure you're using the latest OTP
- Check that all fields are filled correctly
- Phone format must be: +918320709174 (with +91)

## Next Steps

After successful signup, you can:
1. Login at http://localhost:3000/login
2. Use the same email/password to login
3. Explore the StudyNotion platform

## Development Mode Features

In development mode (NODE_ENV !== 'production'):
- ✅ OTP shown in API response
- ✅ OTP logged to console
- ✅ Signup works even if SMS fails
- ✅ Detailed error messages

## Production Deployment

Before deploying to production:
1. Set NODE_ENV=production
2. Verify phone numbers in Twilio OR upgrade account
3. Remove OTP from API responses
4. Enable proper error handling
