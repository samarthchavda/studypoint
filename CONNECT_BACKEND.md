# 🔌 Connect Backend to Your Live Vercel Project

Your frontend is live on Vercel but not connected to the backend. Follow these steps to connect them:

## ✅ What I've Already Done

1. ✅ Updated CORS configuration in backend to accept Vercel domains
2. ✅ Configured `.env.production` to use `/api/v1` (same domain routing)
3. ✅ Your `vercel.json` is already set up correctly

## 🚀 Steps to Connect Backend on Vercel

### Step 1: Add Backend Environment Variables to Vercel

You need to add environment variables in your Vercel dashboard:

1. **Go to your Vercel project**: https://vercel.com/dashboard
2. **Select your StudyNotion project**
3. **Go to**: Settings → Environment Variables
4. **Add the following variables** (one by one):

#### Required Backend Environment Variables:

| Variable Name | Description | Example |
|--------------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/studynotion` |
| `JWT_SECRET` | Secret for JWT tokens | `my_super_secret_jwt_key_12345` |
| `CLOUDNAME` | Cloudinary cloud name | Your cloudinary cloud name |
| `APIKEY` | Cloudinary API key | Your cloudinary API key |
| `APISECRET` | Cloudinary API secret | Your cloudinary API secret |
| `RAZORPAY_KEY_ID` | Razorpay key ID | Your razorpay key |
| `RAZORPAY_KEY_SECRET` | Razorpay secret | Your razorpay secret |
| `FOLDERNAME` | Cloudinary folder | `StudyNotion` |
| `MAIL_HOST` | Email service host | `smtp.gmail.com` |
| `MAIL_USER` | Your email address | `yourmail@gmail.com` |
| `MAIL_PASS` | Email app password | Your Gmail app password |
| `PORT` | Server port | `4000` |
| `NODE_ENV` | Environment | `production` |

#### Frontend Environment Variable:

| Variable Name | Value |
|--------------|-------|
| `REACT_APP_BASE_URL` | `/api/v1` |
| `REACT_APP_RAZORPAY_KEY` | Your Razorpay Key ID |

### Step 2: Redeploy Your Project

After adding all environment variables:

1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **Redeploy** button
4. Select **Use existing Build Cache** ❌ (uncheck it to rebuild with new env vars)
5. Click **Redeploy**

### Step 3: Verify Backend is Working

After deployment completes:

1. Visit: `https://your-vercel-url.vercel.app/api/v1/auth/login`
2. You should see a response (even if it's an error about missing credentials)
3. Check browser console for any errors

## 📝 Quick Setup Using Terminal (Alternative Method)

You can also use the Vercel CLI to add environment variables:

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
cd "/Users/chavdasamarth/Desktop/untitled folder/StudyNotion-main"
vercel link

# Add environment variables (you'll be prompted for values)
vercel env add MONGO_URI production
vercel env add JWT_SECRET production
vercel env add CLOUDNAME production
vercel env add APIKEY production
vercel env add APISECRET production
vercel env add RAZORPAY_KEY_ID production
vercel env add RAZORPAY_KEY_SECRET production
vercel env add FOLDERNAME production
vercel env add MAIL_HOST production
vercel env add MAIL_USER production
vercel env add MAIL_PASS production
vercel env add PORT production
vercel env add NODE_ENV production
vercel env add REACT_APP_BASE_URL production
vercel env add REACT_APP_RAZORPAY_KEY production

# Redeploy
vercel --prod
```

## 🔍 Troubleshooting

### If backend still doesn't work:

1. **Check Vercel Logs**:
   - Go to your project in Vercel
   - Click on **Deployments**
   - Click on latest deployment
   - Check **Function Logs** to see backend errors

2. **Common Issues**:
   - ❌ MongoDB connection string incorrect
   - ❌ Missing environment variables
   - ❌ Cloudinary credentials invalid
   - ❌ CORS issues (already fixed in code)

3. **Test Backend Endpoint**:
   ```bash
   curl https://your-vercel-url.vercel.app/api/v1
   ```
   Should return: `{"success": true, "message": "Your server is up and running..."}`

## 📱 What's Changed in Your Code

1. **Updated CORS** in [`server/index.js`](server/index.js) to properly handle Vercel domains
2. **Configured** [`.env.production`](.env.production) to use relative path `/api/v1`
3. **Kept** [`.env`](.env) for local development with `http://localhost:4000/api/v1`

## 🎯 Next Steps

After backend is connected:
1. Test user registration
2. Test login functionality
3. Test course creation (if you're instructor)
4. Test payment flow with Razorpay

## 💡 Important Notes

- Your backend will run as **Vercel Serverless Functions** (not a traditional server)
- Each API request will trigger a serverless function
- There might be a slight cold start delay (1-2 seconds) on first request
- MongoDB Atlas (cloud) is **required** - localhost MongoDB won't work on Vercel

## 🔐 Getting Your Credentials

### MongoDB Atlas:
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string from "Connect" button

### Cloudinary:
1. Go to https://cloudinary.com
2. Sign up for free
3. Get credentials from Dashboard

### Razorpay:
1. Go to https://razorpay.com
2. Create account
3. Get API keys from Dashboard → Settings → API Keys

### Gmail App Password:
1. Enable 2-Factor Authentication on Gmail
2. Go to Google Account → Security
3. Generate App Password for "Mail"

---

Need help? Check Vercel function logs for specific errors!
