# 🚀 StudyNotion - Quick Start Guide

## ✅ Current Status: WORKING

Both servers are running and the application is ready to use!

---

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000

---

## 🔐 Test Account (Already Created)

Use these credentials to login:

```
Email: chavdasamarth02@gmail.com
Password: 12345678
Phone: +918320709174
```

**Login URL**: http://localhost:3000/login

**After Login**: You'll be redirected to the home page (`/`)

---

## 📱 How OTP Works (For New Signups)

1. Go to http://localhost:3000/signup
2. Fill in the signup form
3. Click "Send OTP"
4. **Check your terminal** (where you ran `npm run dev`)
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

---

## 🧪 Quick Tests

### Test OTP & Signup (Automated)
```bash
cd StudyNotion-main
node test-auto-signup.js
```

### Test Login
```bash
cd StudyNotion-main
node test-login.js
```

---

## 🛠️ Start/Stop Servers

### Start Both Servers
```bash
cd StudyNotion-main
npm run dev
```

### Stop Servers
Press `Ctrl + C` in the terminal

### If Ports Are Busy
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 4000
lsof -ti:4000 | xargs kill -9
```

---

## 📚 What You Can Do Now

### As a Student:
- ✅ Browse courses
- ✅ Enroll in courses
- ✅ Watch course videos
- ✅ Track progress
- ✅ Rate courses
- ✅ Manage profile

### As an Instructor:
- ✅ Create courses
- ✅ Upload videos
- ✅ Manage course content
- ✅ View analytics
- ✅ Manage students

---

## 🔧 Troubleshooting

### OTP Not Showing?
- Check the terminal where `npm run dev` is running
- Look for yellow `[server]` logs
- OTP is also in the API response (check browser console)

### Can't Login?
- Make sure you've signed up first
- Use the test account credentials above
- Check that both servers are running

### Server Not Starting?
- Kill processes on ports 3000 and 4000
- Run `npm run dev` again

---

## 📖 Documentation

- **Complete Test Results**: `COMPLETE_TEST_RESULTS.md`
- **OTP Testing Guide**: `OTP_TESTING_GUIDE.md`
- **Signup Summary**: `SIGNUP_SUCCESS_SUMMARY.md`

---

## 🎯 Quick Commands

```bash
# Start application
npm run dev

# Test OTP
node test-otp-signup.js

# Test signup
node test-auto-signup.js

# Test login
node test-login.js

# Kill ports
lsof -ti:3000 | xargs kill -9 && lsof -ti:4000 | xargs kill -9
```

---

## ✨ Features Working

- ✅ User Authentication (Signup/Login)
- ✅ OTP Verification (Console-based for development)
- ✅ JWT Token Generation
- ✅ Phone Number Support (+91 format)
- ✅ Email Support
- ✅ Profile Management
- ✅ Course Management
- ✅ Payment Integration (Razorpay)
- ✅ File Upload (Cloudinary)
- ✅ Database (MongoDB Atlas)

---

## 🚨 Important Notes

1. **OTP via Console**: SMS doesn't work due to Twilio trial account. OTP is displayed in console instead.
2. **Development Mode**: OTP is shown in API response for testing.
3. **Test Account**: Already created and ready to use.
4. **Servers Running**: Both frontend and backend are operational.

---

## 🎉 You're All Set!

Visit http://localhost:3000 and start exploring StudyNotion!

**Happy Learning! 📚**
