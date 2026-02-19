#!/bin/bash

# 🚀 Vercel Environment Setup Script
# This script helps you add all required environment variables to Vercel

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   🔌 StudyNotion Backend Connection Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "This script will help you add environment variables to Vercel."
echo ""
echo "⚠️  Prerequisites:"
echo "   1. You must have Vercel CLI installed: npm i -g vercel"
echo "   2. You must be logged in: vercel login"
echo "   3. Have all your credentials ready"
echo ""
read -p "Press Enter to continue..."

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   Step 1: Linking to your Vercel project"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

vercel link

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   Step 2: Adding Backend Environment Variables"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 Tip: You'll be prompted to enter each value"
echo ""

# Backend Environment Variables
echo "📌 Adding MONGO_URI (MongoDB connection string)..."
echo "   Example: mongodb+srv://user:password@cluster.mongodb.net/studynotion"
vercel env add MONGO_URI production

echo ""
echo "📌 Adding JWT_SECRET (Secret key for JWT tokens)..."
echo "   Example: my_super_secret_jwt_key_123456789"
vercel env add JWT_SECRET production

echo ""
echo "📌 Adding CLOUDNAME (Cloudinary cloud name)..."
vercel env add CLOUDNAME production

echo ""
echo "📌 Adding APIKEY (Cloudinary API key)..."
vercel env add APIKEY production

echo ""
echo "📌 Adding APISECRET (Cloudinary API secret)..."
vercel env add APISECRET production

echo ""
echo "📌 Adding RAZORPAY_KEY_ID (Razorpay key)..."
vercel env add RAZORPAY_KEY_ID production

echo ""
echo "📌 Adding RAZORPAY_KEY_SECRET (Razorpay secret)..."
vercel env add RAZORPAY_KEY_SECRET production

echo ""
echo "📌 Adding FOLDERNAME (Cloudinary folder name)..."
echo "   Default: StudyNotion"
vercel env add FOLDERNAME production

echo ""
echo "📌 Adding MAIL_HOST (Email service host)..."
echo "   Example: smtp.gmail.com"
vercel env add MAIL_HOST production

echo ""
echo "📌 Adding MAIL_USER (Your email address)..."
vercel env add MAIL_USER production

echo ""
echo "📌 Adding MAIL_PASS (Gmail app password)..."
vercel env add MAIL_PASS production

echo ""
echo "📌 Adding PORT..."
echo "   Default: 4000"
vercel env add PORT production

echo ""
echo "📌 Adding NODE_ENV..."
echo "   Value: production"
vercel env add NODE_ENV production

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   Step 3: Adding Frontend Environment Variables"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "📌 Adding REACT_APP_BASE_URL..."
echo "   Value: /api/v1"
vercel env add REACT_APP_BASE_URL production

echo ""
echo "📌 Adding REACT_APP_RAZORPAY_KEY (same as RAZORPAY_KEY_ID)..."
vercel env add REACT_APP_RAZORPAY_KEY production

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   Step 4: Deploying to Production"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🚀 Deploying your project with all environment variables..."
echo ""

vercel --prod

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   ✅ Setup Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🎉 Your StudyNotion app is now live with backend connected!"
echo ""
echo "📝 Next steps:"
echo "   1. Visit your Vercel URL"
echo "   2. Test the backend: https://your-url.vercel.app/api/v1"
echo "   3. Try logging in or registering"
echo ""
echo "🔍 If something doesn't work:"
echo "   - Check Vercel Function Logs in your dashboard"
echo "   - Verify all environment variables are set correctly"
echo "   - Make sure MongoDB connection string is correct"
echo ""
echo "📚 For more help, see: CONNECT_BACKEND.md"
echo ""
