# 🚀 Live Deployment Guide - StudyNotion Full Stack

This guide will help you deploy your complete StudyNotion application (Frontend + Backend) live on Vercel so anyone can access it.

## 📋 Prerequisites

Before deploying, ensure you have:

1. ✅ **Vercel Account** - Sign up at [vercel.com](https://vercel.com) (free)
2. ✅ **MongoDB Atlas Database** - [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
3. ✅ **Cloudinary Account** - For file uploads [cloudinary.com](https://cloudinary.com) (free)
4. ✅ **Razorpay Account** - For payments [razorpay.com](https://razorpay.com)
5. ✅ **Gmail App Password** - For sending emails

---

## 🎯 Deployment Strategy

Your app will be deployed on **one Vercel domain** with:
- **Frontend**: React app at root URL
- **Backend**: Serverless API at `/api/v1/*` routes

---

## 📝 Step-by-Step Deployment

### Step 1: Install Vercel CLI

Open your terminal and install Vercel CLI globally:

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

This will open your browser to authenticate.

---

### Step 3: Set Up Environment Variables

You need to add these environment variables in Vercel. You'll do this via the Vercel dashboard after the first deployment, or using the CLI.

#### Backend Environment Variables (Required):

```bash
# Database
MONGODB_URL=your_mongodb_connection_string

# JWT Secret (generate random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Email (Gmail)
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_gmail_app_password

# Razorpay
RAZORPAY_KEY=rzp_test_xxxxxxxxxxxx
RAZORPAY_SECRET=your_razorpay_secret

# Cloudinary
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=StudyNotion

# CORS (will be your Vercel URL)
FRONTEND_URL=https://your-app-name.vercel.app

# Node Environment
NODE_ENV=production
PORT=4000
```

#### Frontend Environment Variables:

```bash
# API Base URL (points to your backend on same domain)
REACT_APP_BASE_URL=/api/v1
```

---

### Step 4: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended for First Time)

1. **Go to [vercel.com/new](https://vercel.com/new)**

2. **Import Your Git Repository**
   - Connect your GitHub/GitLab/Bitbucket account
   - Select your StudyNotion repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Create React App
   - **Root Directory**: `./` (keep as root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   - Click on "Environment Variables"
   - Add **ALL** the variables listed in Step 3
   - Make sure to add them for **Production** environment
   - Important: Add each variable one by one

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (2-5 minutes)
   - You'll get a URL like: `https://your-project-name.vercel.app`

6. **Update FRONTEND_URL Variable**
   - After getting your Vercel URL, go to Project Settings → Environment Variables
   - Update `FRONTEND_URL` with your actual Vercel URL
   - Redeploy the project

---

#### Option B: Using Vercel CLI

1. **Navigate to your project directory:**

```bash
cd "/Users/chavdasamarth/Desktop/untitled folder/StudyNotion-main"
```

2. **Deploy:**

```bash
vercel
```

Follow the prompts:
- Set up and deploy? `Y`
- Which scope? Select your account
- Link to existing project? `N`
- Project name? Press Enter or type a name
- In which directory is your code located? `./`
- Override settings? `N`

3. **Add Environment Variables via CLI:**

After deployment, add environment variables:

```bash
# Add each variable one by one
vercel env add MONGODB_URL production
vercel env add JWT_SECRET production
vercel env add MAIL_HOST production
vercel env add MAIL_USER production
vercel env add MAIL_PASS production
vercel env add RAZORPAY_KEY production
vercel env add RAZORPAY_SECRET production
vercel env add CLOUD_NAME production
vercel env add API_KEY production
vercel env add API_SECRET production
vercel env add FOLDER_NAME production
vercel env add FRONTEND_URL production
vercel env add NODE_ENV production
vercel env add REACT_APP_BASE_URL production
```

4. **Redeploy with environment variables:**

```bash
vercel --prod
```

---

### Step 5: Verify Deployment

1. **Check Frontend:**
   - Open your Vercel URL in browser
   - You should see your StudyNotion homepage

2. **Check Backend API:**
   - Visit: `https://your-app-name.vercel.app/api/v1/auth/test` or any API endpoint
   - You should see a JSON response

3. **Test Key Features:**
   - ✅ User Registration
   - ✅ User Login
   - ✅ Browse Courses
   - ✅ View Course Details
   - ✅ Dashboard Access

---

## 🔧 Troubleshooting

### Issue: API calls failing (404 or CORS errors)

**Solution:**
1. Check if environment variables are set correctly in Vercel
2. Verify `FRONTEND_URL` matches your actual Vercel domain
3. Check browser console for specific errors

### Issue: Database connection errors

**Solution:**
1. Verify `MONGODB_URL` is correct
2. Check if your IP is whitelisted in MongoDB Atlas (use 0.0.0.0/0 for all IPs)
3. Ensure database user has read/write permissions

### Issue: File uploads not working

**Solution:**
1. Verify all Cloudinary environment variables (`CLOUD_NAME`, `API_KEY`, `API_SECRET`)
2. Check Cloudinary dashboard for upload limits

### Issue: Emails not sending

**Solution:**
1. Use Gmail App Password (not your regular password)
2. Generate app password: Google Account → Security → 2-Step Verification → App Passwords
3. Verify `MAIL_HOST`, `MAIL_USER`, and `MAIL_PASS`

### Issue: Payment not working

**Solution:**
1. Verify Razorpay keys (`RAZORPAY_KEY` and `RAZORPAY_SECRET`)
2. Use test mode keys for testing
3. Check Razorpay dashboard for webhook configuration

---

## 📱 Sharing Your Live Application

Once deployed, anyone can access your application at:

```
https://your-project-name.vercel.app
```

Share this URL with:
- Friends and family
- Potential employers (for portfolio)
- On social media
- In your resume/portfolio

---

## 🔄 Updating Your Application

### Automatic Deployments

If you connected via GitHub/GitLab:
- Every push to your main/master branch will automatically deploy
- Pull requests get preview deployments

### Manual Deployments

Using Vercel CLI:

```bash
cd "/Users/chavdasamarth/Desktop/untitled folder/StudyNotion-main"
vercel --prod
```

---

## 🔐 Security Checklist

Before going live, ensure:

- [ ] All environment variables are set in Vercel (not committed to Git)
- [ ] MongoDB connection string is secure
- [ ] JWT_SECRET is a strong random string
- [ ] Gmail app password is used (not regular password)
- [ ] Razorpay keys are valid
- [ ] CORS is configured correctly
- [ ] Remove any console.logs with sensitive data
- [ ] Test all features in production

---

## 📊 Monitoring Your Application

1. **Vercel Dashboard**
   - View deployment logs
   - Check function execution times
   - Monitor bandwidth usage

2. **MongoDB Atlas**
   - Monitor database connections
   - Check query performance
   - View storage usage

3. **Cloudinary Dashboard**
   - Track storage usage
   - Monitor bandwidth
   - View uploaded files

---

## 🎉 Success!

Your StudyNotion application is now live and accessible to anyone with the URL!

### Next Steps:

1. **Test thoroughly** - Try all features in production
2. **Share the URL** - Let others test and provide feedback
3. **Monitor performance** - Check Vercel and MongoDB dashboards
4. **Custom domain** (optional) - Add your own domain in Vercel settings

---

## 💡 Pro Tips

1. **Free Tier Limits:**
   - Vercel: 100GB bandwidth/month
   - MongoDB Atlas: 512MB storage
   - Cloudinary: 25GB storage + 25GB bandwidth

2. **Performance:**
   - Vercel automatically optimizes your React app
   - Use Vercel Analytics (already included in your package.json)
   - Monitor API response times in Vercel dashboard

3. **SEO:**
   - Add meta tags to your React pages
   - Use React Helmet for dynamic meta tags
   - Submit sitemap to Google Search Console

---

## 📞 Need Help?

If you encounter issues:

1. Check Vercel deployment logs: `vercel logs`
2. Check browser console for frontend errors
3. Verify all environment variables are set correctly
4. Review the troubleshooting section above

---

**Good luck with your deployment! 🚀**
