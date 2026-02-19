# URGENT: Fix Render Environment Variables

## Problem
Frontend cannot connect to backend because of:
1. Wrong FRONTEND_URL causing CORS blocking
2. Possibly incorrect MAIL_PASS format

## Solution: Update These Render Environment Variables

Go to: https://dashboard.render.com/web/srv-d07u1ldumphs73b9p950
Click: "Environment" tab

### ⚠️ CRITICAL - Update these values:

```
FRONTEND_URL=https://studynotion-app-rho.vercel.app
MAIL_PASS=aaypsyoxzvtzlkhe
```

### ✅ Verify these are correct:

```
MONGODB_URL=mongodb+srv://StudyPoint:yQjmxQ0aN8d1ehrS@cluster0.whyvvvy.mongodb.net/studynotion?appName=Cluster0
JWT_SECRET=my_super_secret_jwt_key_123456789
MAIL_HOST=smtp.gmail.com
MAIL_USER=chavdasamarth007@gmail.com
RAZORPAY_KEY=rzp_test_1234567890
RAZORPAY_SECRET=test_secret_1234567890
CLOUD_NAME=dfxvpa4zc
API_KEY=884811575129931
API_SECRET=DYzvfYj1vLV1PTjEs7TyuQcy_mM
FOLDER_NAME=StudyNotion
PORT=4000
NODE_ENV=production
```

## Steps:
1. Edit FRONTEND_URL from `https://studynotion-app.vercel.app` to `https://studynotion-app-rho.vercel.app`
2. Verify MAIL_PASS is exactly `aaypsyoxzvtzlkhe` with NO SPACES
3. Click "Save Changes"
4. Wait 1-2 minutes for auto-redeploy
5. Try signup again

## Why This Fixes It:
- CORS was blocking requests because frontend URL didn't match
- Email might not send if MAIL_PASS has spaces or is wrong
