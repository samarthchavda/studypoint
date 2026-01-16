# 🚀 Direct Vercel Deployment - Quick Guide

## ✅ What I've Configured

Your project is now ready for **direct deployment to Vercel** with both frontend and backend together!

### Changes Made:
1. ✅ Updated `vercel.json` - Configured for full-stack deployment
2. ✅ Modified `server/index.js` - Added serverless function export
3. ✅ Updated CORS settings - Auto-detects production environment
4. ✅ Set `.env.production` - API routes to `/api/v1` (same domain)
5. ✅ Updated `.vercelignore` - Proper file exclusions

---

## 🚀 Deploy Now (3 Methods)

### Method 1: Vercel Dashboard (Easiest) ⭐

1. **Go to [vercel.com](https://vercel.com)** and sign in

2. **Click "Add New..." → "Project"**

3. **Import your GitHub repository**
   - If not connected, authorize Vercel to access your GitHub
   - Select your `StudyNotion-main` repository

4. **Configure Project**:
   - **Framework Preset**: Create React App (auto-detected)
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `build` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

5. **Add Environment Variables** (IMPORTANT!):
   
   Click "Environment Variables" and add these:
   
   ```env
   # Frontend Variables
   REACT_APP_BASE_URL=/api/v1
   
   # Backend Variables
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   MAIL_HOST=smtp.gmail.com
   MAIL_USER=your_email@gmail.com
   MAIL_PASS=your_email_app_password
   RAZORPAY_KEY=your_razorpay_key
   RAZORPAY_SECRET=your_razorpay_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   FOLDER_NAME=your_cloudinary_folder
   PORT=4000
   NODE_ENV=production
   ```

6. **Click "Deploy"** 🎉

7. **Wait 2-5 minutes** for build to complete

8. **Your app will be live!** at `https://your-project.vercel.app`

---

### Method 2: Vercel CLI (For Developers)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Navigate to project**:
   ```bash
   cd "/Users/chavdasamarth/Desktop/untitled folder/StudyNotion-main"
   ```

3. **Login to Vercel**:
   ```bash
   vercel login
   ```

4. **Deploy**:
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? `Y`
   - Which scope? Select your account
   - Link to existing project? `N` (first time)
   - What's your project's name? `studynotion` or any name
   - In which directory is your code located? `./`
   - Want to override settings? `N`

5. **Add Environment Variables**:
   ```bash
   vercel env add MONGODB_URL
   vercel env add JWT_SECRET
   vercel env add MAIL_HOST
   vercel env add MAIL_USER
   vercel env add MAIL_PASS
   vercel env add RAZORPAY_KEY
   vercel env add RAZORPAY_SECRET
   vercel env add CLOUD_NAME
   vercel env add API_KEY
   vercel env add API_SECRET
   vercel env add FOLDER_NAME
   vercel env add NODE_ENV
   ```
   
   Or add them all at once in the Vercel dashboard.

6. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

---

### Method 3: GitHub Integration (Automatic)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Configure for Vercel deployment"
   git push origin main
   ```

2. **Go to [vercel.com](https://vercel.com)** → Import Project

3. **Select your repository**

4. **Add environment variables** (see Method 1, step 5)

5. **Click Deploy**

6. **Every push to `main` branch will auto-deploy!** 🔄

---

## 🔧 Environment Variables You Need

Before deploying, gather these credentials:

### MongoDB Atlas
- `MONGODB_URL` - Your MongoDB connection string
- **Make sure to whitelist all IPs**: `0.0.0.0/0` in MongoDB Atlas Network Access

### Email (Gmail)
- `MAIL_HOST` - `smtp.gmail.com`
- `MAIL_USER` - Your Gmail address
- `MAIL_PASS` - [App Password](https://myaccount.google.com/apppasswords) (not your Gmail password!)

### Razorpay
- `RAZORPAY_KEY` - From [Razorpay Dashboard](https://dashboard.razorpay.com/)
- `RAZORPAY_SECRET` - From Razorpay Dashboard

### Cloudinary
- `CLOUD_NAME` - From [Cloudinary Dashboard](https://cloudinary.com/console)
- `API_KEY` - From Cloudinary Dashboard
- `API_SECRET` - From Cloudinary Dashboard
- `FOLDER_NAME` - Folder name for uploads (e.g., `studynotion`)

### Other
- `JWT_SECRET` - Random string (e.g., `my-super-secret-jwt-key-12345`)
- `PORT` - `4000`
- `NODE_ENV` - `production`

---

## ✅ Post-Deployment Checklist

After deployment:

- [ ] Test user registration with OTP
- [ ] Test login functionality
- [ ] Test course creation (instructor)
- [ ] Test course enrollment (student)
- [ ] Test payment flow with Razorpay
- [ ] Test file uploads (course thumbnails, videos)
- [ ] Check email notifications
- [ ] Test all CRUD operations
- [ ] Monitor Vercel logs for errors

---

## 🐛 Common Issues & Solutions

### Issue 1: "Module not found" errors
**Solution**: Make sure all dependencies are in `package.json` (not just `devDependencies`)

### Issue 2: API calls returning 404
**Solution**: Check that routes in `vercel.json` are correct and backend is exported properly

### Issue 3: CORS errors
**Solution**: The CORS is now auto-configured, but make sure `FRONTEND_URL` env variable is set if needed

### Issue 4: Database connection fails
**Solution**: 
- Verify `MONGODB_URL` is correct
- Whitelist `0.0.0.0/0` in MongoDB Atlas Network Access
- Check MongoDB Atlas cluster is running

### Issue 5: File uploads failing
**Solution**: 
- Vercel has a 4.5MB limit for serverless functions
- For larger files, consider using direct Cloudinary uploads from frontend
- Or use Vercel Blob Storage

### Issue 6: Serverless function timeout
**Solution**: 
- Vercel free tier has 10s timeout
- Optimize long-running operations
- Consider upgrading to Pro plan (60s timeout)

### Issue 7: Environment variables not working
**Solution**: 
- Redeploy after adding environment variables
- Check variable names are exact
- For React, must start with `REACT_APP_`

---

## 📊 Monitoring Your Deployment

### Vercel Dashboard
- View real-time logs
- Monitor function execution times
- Check error rates
- View deployment history

### Access Logs:
1. Go to your project in Vercel
2. Click "Deployments"
3. Click on a deployment
4. Click "View Function Logs"

---

## 🎯 Next Steps After Deployment

1. **Test Everything Thoroughly**
2. **Add Custom Domain** (optional):
   - Go to Project Settings → Domains
   - Add your domain
   - Configure DNS records

3. **Set Up Monitoring**:
   - Enable Vercel Analytics
   - Set up error tracking (Sentry, LogRocket, etc.)

4. **Configure Razorpay Webhook**:
   - Update webhook URL in Razorpay Dashboard to:
   - `https://your-project.vercel.app/api/v1/payment/verifySignature`

5. **Update Social Links**:
   - Update any hardcoded URLs in your code
   - Update GitHub README with live link

---

## 🆘 Need Help?

### Check Build Logs:
```bash
vercel logs your-project-url.vercel.app
```

### Redeploy:
```bash
vercel --prod
```

### View All Deployments:
```bash
vercel ls
```

---

## 🎉 You're All Set!

Your project is configured and ready to deploy. Just follow **Method 1** above for the easiest deployment experience.

**Deployment Time**: Usually 3-5 minutes ⏱️

Once deployed, your app will be available at:
- `https://your-project.vercel.app`
- Auto-updates on every git push (if using GitHub integration)

Good luck! 🚀
