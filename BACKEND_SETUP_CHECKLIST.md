# ✅ Backend Connection Checklist

## 🎯 Quick Start - Choose Your Method:

### Method 1: Using Vercel Dashboard (Easiest - Recommended)
1. Go to https://vercel.com/dashboard
2. Select your StudyNotion project
3. Go to **Settings** → **Environment Variables**
4. Add all variables from the list below
5. Go to **Deployments** → Click latest deployment → **Redeploy**

### Method 2: Using Terminal (Faster)
```bash
cd "/Users/chavdasamarth/Desktop/untitled folder/StudyNotion-main"
./setup-backend-vercel.sh
```

---

## 📋 Environment Variables to Add

### Backend Variables (REQUIRED):

| Variable | Where to Get | Example |
|----------|--------------|---------|
| `MONGO_URI` | [MongoDB Atlas](https://mongodb.com/cloud/atlas) | `mongodb+srv://user:pass@cluster.mongodb.net/studynotion` |
| `JWT_SECRET` | Create your own secret | `my_super_secret_jwt_key_123456789` |
| `CLOUDNAME` | [Cloudinary Dashboard](https://cloudinary.com/console) | Your cloud name |
| `APIKEY` | [Cloudinary Dashboard](https://cloudinary.com/console) | Your API key |
| `APISECRET` | [Cloudinary Dashboard](https://cloudinary.com/console) | Your API secret |
| `RAZORPAY_KEY_ID` | [Razorpay Dashboard](https://dashboard.razorpay.com/) | Your key ID |
| `RAZORPAY_KEY_SECRET` | [Razorpay Dashboard](https://dashboard.razorpay.com/) | Your secret |
| `FOLDERNAME` | Choose folder name | `StudyNotion` |
| `MAIL_HOST` | Email provider | `smtp.gmail.com` |
| `MAIL_USER` | Your email | `yourmail@gmail.com` |
| `MAIL_PASS` | [Gmail App Password](https://myaccount.google.com/apppasswords) | 16-character password |
| `PORT` | Set to 4000 | `4000` |
| `NODE_ENV` | Set to production | `production` |

### Frontend Variables (REQUIRED):

| Variable | Value |
|----------|-------|
| `REACT_APP_BASE_URL` | `/api/v1` |
| `REACT_APP_RAZORPAY_KEY` | Same as `RAZORPAY_KEY_ID` |

---

## 🔐 Quick Guide to Get Credentials:

### 1. MongoDB Atlas (Free)
```
1. Go to https://mongodb.com/cloud/atlas
2. Sign up and create a FREE cluster (M0)
3. Create a database user
4. Allow access from anywhere (0.0.0.0/0)
5. Click "Connect" → "Connect your application"
6. Copy connection string and replace <password>
```

### 2. Cloudinary (Free)
```
1. Go to https://cloudinary.com
2. Sign up for free account
3. Go to Dashboard
4. Copy: Cloud Name, API Key, API Secret
```

### 3. Razorpay (Test Mode)
```
1. Go to https://razorpay.com
2. Sign up
3. Go to Settings → API Keys
4. Generate Test Keys (for development)
```

### 4. Gmail App Password
```
1. Enable 2FA on your Gmail account
2. Go to https://myaccount.google.com/apppasswords
3. Select "Mail" and generate password
4. Use the 16-character password (no spaces)
```

---

## 🚀 After Adding Variables:

### Verify Backend is Working:

1. **Check Home Route:**
   ```
   https://your-vercel-url.vercel.app/
   ```
   Should show: `{"success": true, "message": "Your server is up and running..."}`

2. **Check API Route:**
   ```
   https://your-vercel-url.vercel.app/api/v1
   ```
   Should also return success message

3. **Check Function Logs:**
   - Go to Vercel Dashboard
   - Click on your project
   - Go to **Deployments**
   - Click on latest deployment
   - Check **Functions** tab for any errors

---

## ❌ Troubleshooting:

### Backend not responding?
- ✅ Check all environment variables are added in Vercel
- ✅ Make sure you clicked "Redeploy" after adding variables
- ✅ Check Vercel Function Logs for errors
- ✅ Verify MongoDB connection string is correct

### Frontend not connecting to backend?
- ✅ Make sure `REACT_APP_BASE_URL` is set to `/api/v1`
- ✅ Check browser console for CORS errors
- ✅ Verify the deployment rebuilt after adding env vars

### Database connection error?
- ✅ Make sure MongoDB cluster is active
- ✅ Check IP whitelist allows all IPs (0.0.0.0/0)
- ✅ Verify database user has read/write permissions
- ✅ Connection string has correct password

### Cloudinary upload failing?
- ✅ Verify cloud name, API key, and secret are correct
- ✅ Check folder name exists or can be created

---

## 📞 Need More Help?

1. Read the detailed guide: [CONNECT_BACKEND.md](CONNECT_BACKEND.md)
2. Check Vercel docs: https://vercel.com/docs/environment-variables
3. View deployment logs in Vercel dashboard

---

## ✨ You're Done When:

- [ ] All environment variables added to Vercel
- [ ] Project redeployed successfully
- [ ] Backend responds at `/api/v1`
- [ ] Can register/login from frontend
- [ ] No errors in browser console or Vercel logs

---

**Current Status of Your Setup:**
- ✅ Frontend deployed on Vercel
- ✅ Backend code ready in `server/` folder
- ✅ `vercel.json` configured correctly
- ✅ CORS updated to accept Vercel domains
- ⏳ **Need to add environment variables to Vercel**
