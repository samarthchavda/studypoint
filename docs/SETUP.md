# 🚀 Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn package manager

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/samarthchavda/studypoint.git
cd StudyNotion-main
```

### 2. Install Dependencies

#### Frontend
```bash
npm install
```

#### Backend
```bash
cd server
npm install
```

### 3. Environment Configuration

#### Frontend (.env in root)
```env
REACT_APP_BASE_URL=http://localhost:4000/api/v1
```

#### Backend (server/.env)
```env
# Server
PORT=4000
NODE_ENV=development

# Database
MONGODB_URL=mongodb://localhost:27017/studynotion

# JWT
JWT_SECRET=your_jwt_secret_key

# Mail Service
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password

# Cloudinary
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

# Razorpay
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
```

### 4. Start MongoDB
```bash
# Using Homebrew (macOS)
brew services start mongodb-community

# Or direct mongod command
mongod --dbpath /path/to/your/data/directory
```

### 5. Seed Database (Optional)
```bash
cd server
npm run seed
```

### 6. Start the Application

#### Backend Server
```bash
cd server
npm run dev
```

#### Frontend (in new terminal)
```bash
npm start
```

The frontend will run on `http://localhost:3000` and backend on `http://localhost:4000`.

## Quick Start Commands

```bash
# Start backend
cd server && npm run dev

# Start frontend (new terminal)
npm start

# Run both concurrently (from root)
npm run dev

# Seed database
cd server && npm run seed
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 4000
lsof -ti:4000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### MongoDB Connection Issues
- Ensure MongoDB is running: `brew services list | grep mongodb`
- Check MongoDB logs: `tail -f /usr/local/var/log/mongodb/mongo.log`
- Verify connection string in `.env`

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Default Admin Account

After seeding, use these credentials:
- Email: `admin@studynotion.com`
- Password: `admin123`

(Change these in production!)
