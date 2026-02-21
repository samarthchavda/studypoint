# 📱 Production Signup Guide

## How to Signup on Production

**URL**: https://studypoint-eta.vercel.app/signup

---

## ✅ Step-by-Step Signup Process

### Step 1: Open Signup Page
Visit: https://studypoint-eta.vercel.app/signup

### Step 2: Fill in Details
- **First Name**: Your first name
- **Last Name**: Your last name
- **Email**: Your email address
- **Phone**: Your 10-digit mobile number (without +91)
- **Password**: Create a password
- **Confirm Password**: Re-enter password
- **Account Type**: Select Student or Instructor

### Step 3: Click "Send OTP"
- Click the "Send OTP" button
- Wait for the response

### Step 4: Get OTP from Console
**IMPORTANT**: Since Twilio is in trial mode, OTP won't come via SMS.

**How to get OTP**:
1. Press **F12** on your keyboard (or right-click → Inspect)
2. Go to **Console** tab
3. Look for: `🔐 YOUR OTP IS: 123456`
4. **Also check** for a green toast notification at the top of the page

### Step 5: Enter OTP
- Copy the 6-digit OTP
- Paste it in the verification page
- Click "Verify and Register"

### Step 6: Success!
- You'll be redirected to login
- Use your email and password to login

---

## 🔍 Troubleshooting

### Issue 1: "Send OTP" Button Not Working

**Check**:
1. Open browser console (F12)
2. Click "Send OTP"
3. Look for errors in Console tab
4. Check Network tab for failed requests

**Common Causes**:
- Backend not responding
- CORS error
- Invalid phone number format

**Solution**:
- Make sure phone is 10 digits
- Don't include +91 or spaces
- Check console for specific error

### Issue 2: OTP Not Showing

**Where to Look**:
1. **Browser Console** (F12 → Console)
   - Look for: `🔐 YOUR OTP IS: 123456`
   
2. **Toast Notification**
   - Green notification at top of page
   - Shows for 10 seconds
   
3. **Network Tab** (F12 → Network)
   - Click on "sendotp" request
   - Go to Response tab
   - Look for `"otp": "123456"`

**If Still Not Showing**:
- Backend might not be working
- Check Vercel logs
- Try again after a few minutes

### Issue 3: "Invalid Phone Number" Error

**Requirements**:
- Must be exactly 10 digits
- Must start with 6, 7, 8, or 9
- No spaces, dashes, or +91

**Examples**:
- ✅ Correct: `8320709174`
- ❌ Wrong: `+918320709174`
- ❌ Wrong: `91 8320709174`
- ❌ Wrong: `832-070-9174`

### Issue 4: "OTP Expired" Error

**Cause**: OTP is valid for only 5 minutes

**Solution**:
1. Click "Resend it" button
2. Get new OTP from console
3. Enter the new OTP quickly

### Issue 5: Backend Not Responding

**Check**:
Visit: https://studypoint-eta.vercel.app/api/v1/auth/sendotp

**Expected**: Should show API response (even if error)
**If 404**: Backend not deployed properly

**Solution**:
- Wait a few minutes for deployment to complete
- Check Vercel dashboard for deployment status
- Redeploy if necessary

---

## 🧪 Test Signup

### Test Account Details:
```
First Name: Test
Last Name: User
Email: test@example.com
Phone: 9876543210
Password: Test@123
Account Type: Student
```

### Expected Flow:
1. Fill form → Click "Send OTP"
2. Check console → Get OTP
3. Enter OTP → Click "Verify"
4. Success → Redirect to login
5. Login → Redirect to home

---

## 📝 Important Notes

### About OTP SMS:
- ❌ SMS will NOT be delivered (Twilio trial)
- ✅ OTP will show in browser console
- ✅ OTP will show in toast notification
- ✅ This is expected behavior

### About Phone Number:
- Must be Indian mobile number
- 10 digits only
- Starts with 6, 7, 8, or 9
- System adds +91 automatically

### About OTP:
- Valid for 5 minutes
- Can be resent unlimited times
- Each resend generates new OTP
- Old OTP becomes invalid

---

## 🔧 Developer Tools

### To Debug:

1. **Open Console**:
   - Windows/Linux: `Ctrl + Shift + J`
   - Mac: `Cmd + Option + J`

2. **Check Network**:
   - F12 → Network tab
   - Click "Send OTP"
   - Look for API calls

3. **Check Response**:
   - Click on "sendotp" request
   - Go to Response tab
   - Should see: `{"success": true, "otp": "123456"}`

---

## ✅ Success Indicators

### OTP Sent Successfully:
- ✅ Green toast: "OTP sent successfully"
- ✅ Console log: "🔐 YOUR OTP IS: 123456"
- ✅ Redirected to verify page
- ✅ 6 OTP input boxes appear

### Signup Successful:
- ✅ Green toast: "Signed up successfully"
- ✅ Redirected to login page
- ✅ Can login with email/password

---

## 🎯 Quick Reference

### Signup URL:
```
https://studypoint-eta.vercel.app/signup
```

### Get OTP:
```
1. Press F12
2. Go to Console tab
3. Look for: 🔐 YOUR OTP IS: 123456
```

### Verify OTP:
```
1. Copy OTP from console
2. Paste in verification page
3. Click "Verify and Register"
```

### Login:
```
URL: https://studypoint-eta.vercel.app/login
Use: Email + Password
```

---

## 📞 Still Having Issues?

### Check These:

1. **Is backend running?**
   - Visit: https://studypoint-eta.vercel.app/api/v1/auth/sendotp
   - Should return response (not 404)

2. **Is OTP in console?**
   - F12 → Console
   - Look for OTP log

3. **Is phone number valid?**
   - 10 digits
   - Starts with 6, 7, 8, or 9

4. **Is browser updated?**
   - Use latest Chrome/Firefox/Safari
   - Clear cache if needed

---

**Production URL**: https://studypoint-eta.vercel.app/signup
**Status**: ✅ DEPLOYED
**OTP Method**: Browser Console (F12)
