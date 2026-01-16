# 🚀 Vercel Deployment Guide for StudyNotion

This guide will help you deploy your StudyNotion application to Vercel.

## 📋 Overview

Your application consists of:
- **Frontend**: React application (root directory)
- **Backend**: Node.js/Express server (server directory)

**Important**: Vercel is optimized for frontend deployments. For the backend, you have two options:
1. Deploy backend separately (Recommended)
2. Convert backend to Vercel Serverless Functions (Complex for this project)

## 🎯 Recommended Approach

### Deploy Frontend on Vercel + Backend on Render/Railway

This is the **recommended** approach for your full-stack application.

---

## 📦 Option 1: Frontend on Vercel + Backend Elsewhere (Recommended)

### Step 1: Deploy Backend First

#### Using Render (Free tier available)

1. **Create Render Account**: Go to [render.com](https://render.com)

2. **Create New Web Service**:
   - Connect your GitHub repository
   - Select "Web Service"
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: `Node`

3. **Set Environment Variables** in Render:
   ```
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
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
   ```

4. **Deploy** - Render will give you a URL like: `https://your-app.onrender.com`

#### Alternative: Railway

1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub repo
3. Select the `server` directory
4. Add same environment variables
5. Deploy and get your backend URL

---

### Step 2: Configure Frontend for Production

1. **Create `.env.production` file** in root directory:

```env
REACT_APP_BASE_URL=https://your-backend-url.onrender.com/api/v1
```

2. **Update your API configuration** to use environment-specific URLs

---

### Step 3: Deploy Frontend to Vercel

#### Method A: Using Vercel Dashboard (Easiest)

1. **Go to [vercel.com](https://vercel.com)** and sign up/login

2. **Click "Add New Project"**

3. **Import your GitHub repository**

4. **Configure Project**:
   - **Framework Preset**: Create React App
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

5. **Add Environment Variables**:
   ```
   REACT_APP_BASE_URL=https://your-backend-url.onrender.com/api/v1
   ```
   Add any other REACT_APP_* variables your frontend needs.

6. **Deploy** - Click "Deploy" button

#### Method B: Using Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd /Users/chavdasamarth/Desktop/untitled folder/StudyNotion-main
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new
   - Confirm settings
   - Set environment variables when prompted

5. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

---

## 📦 Option 2: Full Deployment on Vercel (Advanced)

If you want to deploy everything on Vercel, you'll need to restructure your backend as serverless functions.

### Step 1: Create Vercel Configuration

Create `vercel.json` in root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    },
    {
      "src": "server/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/server/:path*"
    }
  ]
}
```

### Step 2: Update Server for Serverless

Modify `server/index.js` to export the Express app:

```javascript
// At the end of server/index.js
module.exports = app;
```

### Step 3: Deploy

```bash
vercel --prod
```

**Note**: This approach has limitations:
- Serverless functions have timeout limits (10s on free tier)
- File uploads may need different handling
- Background jobs won't work the same way

---

## 🔧 Post-Deployment Configuration

### 1. Update CORS Settings

In your backend (`server/index.js`), update CORS to allow your Vercel domain:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-app.vercel.app',
    'https://your-custom-domain.com'
  ],
  credentials: true
}));
```

### 2. Configure Custom Domain (Optional)

In Vercel Dashboard:
1. Go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### 3. Update Razorpay Webhook URL

In Razorpay Dashboard, update webhook URL to:
```
https://your-backend-url.onrender.com/api/v1/payment/webhook
```

### 4. Update Cloudinary Settings

Ensure your Cloudinary account allows requests from your new domains.

---

## 🔐 Environment Variables Checklist

### Frontend (.env or Vercel Environment Variables)
```
REACT_APP_BASE_URL=your_backend_api_url
```

### Backend (Render/Railway Environment Variables)
```
MONGODB_URL=
JWT_SECRET=
MAIL_HOST=
MAIL_USER=
MAIL_PASS=
RAZORPAY_KEY=
RAZORPAY_SECRET=
CLOUD_NAME=
API_KEY=
API_SECRET=
FOLDER_NAME=
PORT=4000
FRONTEND_URL=https://your-app.vercel.app
```

---

## ✅ Pre-Deployment Checklist

- [ ] Backend deployed and tested
- [ ] MongoDB Atlas configured with IP whitelist (0.0.0.0/0 for production)
- [ ] All environment variables set
- [ ] CORS configured for production domains
- [ ] Razorpay webhook URL updated
- [ ] Email service configured and tested
- [ ] Cloudinary folders and permissions set
- [ ] Frontend API URL points to production backend
- [ ] Test payment flow in production
- [ ] Test email notifications
- [ ] Test file uploads

---

## 🐛 Common Issues & Solutions

### Issue 1: API Calls Failing
**Solution**: Check that `REACT_APP_BASE_URL` is correctly set and includes `/api/v1`

### Issue 2: CORS Errors
**Solution**: Update backend CORS configuration to include your Vercel domain

### Issue 3: Environment Variables Not Working
**Solution**: In Vercel, make sure variables start with `REACT_APP_` and redeploy after adding them

### Issue 4: Build Fails
**Solution**: Check build logs in Vercel dashboard. Common issues:
- Missing dependencies in package.json
- Build command incorrect
- Node version mismatch

### Issue 5: 404 on Page Refresh
**Solution**: Vercel should auto-configure this for Create React App, but if not, ensure your `public/index.html` exists

### Issue 6: Backend Timeout on Render (Free Tier)
**Solution**: Render free tier sleeps after inactivity. Consider:
- Upgrading to paid tier
- Using a wake-up service
- Switching to Railway or other platforms

---

## 📊 Monitoring Your Deployment

### Vercel Analytics
Vercel automatically provides:
- Real-time visitor analytics
- Performance metrics
- Error tracking

Access via: Project → Analytics

### Backend Monitoring
For Render:
- View logs in Render dashboard
- Set up health check endpoints
- Monitor resource usage

---

## 🚀 Quick Deploy Commands

```bash
# Frontend (Vercel)
cd /Users/chavdasamarth/Desktop/untitled\ folder/StudyNotion-main
vercel --prod

# Backend (if using Vercel)
cd server
vercel --prod
```

---

## 📞 Need Help?

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Render Docs**: [render.com/docs](https://render.com/docs)
- **Railway Docs**: [docs.railway.app](https://docs.railway.app)

---

## 🎉 Success!

Once deployed:
1. Test all major features
2. Monitor error logs for first few days
3. Set up automated backups for MongoDB
4. Configure monitoring/alerting
5. Share your live URL!

**Your app will be live at**: `https://your-project.vercel.app`

---

Good luck with your deployment! 🚀
