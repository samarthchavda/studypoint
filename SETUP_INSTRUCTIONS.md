# StudyNotion - Setup Instructions

## Issues Fixed

### 1. ✅ Catalog Course Display Issue
- **Problem**: Courses not showing in catalog due to inconsistent status field casing
- **Fix**: Changed all status checks from "Published" to "published" (lowercase) in `server/controllers/categoryCon.js` and `courseCon.js`

### 2. ✅ Course Image/Thumbnail Display
- **Problem**: Missing or broken course images
- **Fix**: Added fallback placeholder images for all course cards with proper error handling
- **Files Updated**:
  - `src/components/comman/CourseCard.jsx`
  - `src/components/catalog/CourseCard.jsx`
  - `src/components/dashboard/wishList/CourseCard..jsx`

### 3. ✅ Environment Variables
- **Fix**: Cleaned up sensitive data and added proper placeholders
- **File**: `server/.env`

## Setup Steps

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas account)
- Cloudinary account (for image/video hosting)
- Razorpay account (for payments)

### 1. Install Dependencies

#### Install Root Dependencies (Client)
```bash
cd "/Users/chavdasamarth/Desktop/untitled folder/StudyNotion-main"
npm install
```

#### Install Server Dependencies
```bash
cd server
npm install
cd ..
```

### 2. Configure Environment Variables

#### Server Environment (.env in server folder)
Update `server/.env` with your actual credentials:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/studynotion
# Or use MongoDB Atlas: mongodb+srv://<username>:<password>@cluster.mongodb.net/studynotion

# Cloudinary (Sign up at https://cloudinary.com)
CLOUDNAME=your_cloudinary_cloud_name
APIKEY=your_cloudinary_api_key
APISECRET=your_cloudinary_api_secret

# Razorpay (Sign up at https://razorpay.com)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# JWT Secret (use any strong random string)
JWT_SECRET=my_super_secret_jwt_key_123456789

# Cloudinary Folder
FOLDERNAME=StudyNotion

# Email Configuration (Gmail App Password)
USEREMAIL=your_email@gmail.com
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_gmail_app_password
```

#### Client Environment (.env in root folder)
Update `.env` with:

```env
REACT_APP_BASE_URL=http://localhost:4000/api/v1
REACT_APP_RAZORPAY_KEY=your_razorpay_key_id
```

### 3. Start MongoDB
Ensure MongoDB is running:

```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
```

### 4. Run the Application

#### Option 1: Run Both Client and Server Together
```bash
npm run dev
```

#### Option 2: Run Separately

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start Frontend Client:**
```bash
npm start
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:4000

## Key Changes Made

### Backend Changes

1. **server/controllers/categoryCon.js**
   - Changed all `status: "Published"` to `status: "published"` (lines 76, 112, 121, 159, 195)
   - This ensures consistency with the Course model schema

2. **server/controllers/courseCon.js**
   - Changed default status from "Draft" to "draft" (line 60)
   - Ensures consistent lowercase status values

### Frontend Changes

1. **src/components/comman/CourseCard.jsx**
   - Added fallback placeholder image
   - Added onError handler for broken images
   - Uses: `https://via.placeholder.com/400x200/1F2937/FFFFFF?text=No+Image`

2. **src/components/catalog/CourseCard.jsx**
   - Added fallback placeholder image
   - Added onError handler for broken images
   - Added proper alt text

3. **src/components/dashboard/wishList/CourseCard..jsx**
   - Added fallback placeholder image for wishlist items
   - Added onError handler

## Testing the Fixes

### Test Catalog Issue:
1. Navigate to http://localhost:3000
2. Click on any category in the navigation (e.g., "Web Development", "AI")
3. Courses should now display properly in the catalog page
4. If no courses exist, you'll see "No courses found here" message

### Test Image Display:
1. Browse any course listing
2. Images should display properly
3. If image URL is broken or missing, placeholder will show
4. Placeholder shows "No Image" text on gray background

### Create Admin and Sample Data (Optional):
```bash
cd server
node scripts/createAdmin.js
node scripts/createSampleCourses.js
```

## Common Issues & Solutions

### Issue: MongoDB Connection Error
**Solution**: 
- Ensure MongoDB is running: `mongod`
- Check MONGO_URI in server/.env
- For MongoDB Atlas, ensure IP whitelist is configured

### Issue: Cloudinary Upload Fails
**Solution**:
- Verify Cloudinary credentials in server/.env
- Check if CLOUDNAME, APIKEY, and APISECRET are correct
- Ensure folder name matches FOLDERNAME variable

### Issue: Email Not Sending
**Solution**:
- Use Gmail App Password (not regular password)
- Enable 2-Step Verification in Google Account
- Generate App Password from Google Account Security settings

### Issue: Razorpay Payment Test
**Solution**:
- Use Razorpay Test Mode credentials
- Test card: 4111 1111 1111 1111
- Any future expiry date and CVV

## Project Structure

```
StudyNotion-main/
├── public/              # Static files
├── server/              # Backend (Express + MongoDB)
│   ├── config/          # Database, Cloudinary, Razorpay config
│   ├── controllers/     # Business logic
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions
│   └── index.js         # Server entry point
├── src/                 # Frontend (React)
│   ├── components/      # Reusable components
│   ├── pages/           # Page components
│   ├── services/        # API calls
│   ├── slices/          # Redux slices
│   └── App.js           # Main app component
└── package.json         # Dependencies
```

## Available Scripts

```bash
# Client (from root)
npm start              # Start React app
npm run build          # Build for production
npm test               # Run tests

# Server (from server folder)
npm run dev            # Start with nodemon (auto-reload)
npm start              # Start normally
npm run seed           # Seed sample data

# Both (from root)
npm run dev            # Start both client and server
npm run server         # Start server only
```

## Next Steps

1. ✅ Install dependencies
2. ✅ Configure environment variables
3. ✅ Start MongoDB
4. ✅ Run the application
5. Create admin account (optional): `node server/scripts/createAdmin.js`
6. Create sample courses (optional): `node server/scripts/createSampleCourses.js`
7. Test the application features

## Support

For issues or questions:
- Check the main README.md
- Review error logs in terminal
- Ensure all environment variables are correctly set
- Verify MongoDB connection

---

**All issues have been fixed! The project is ready to run.** 🎉
