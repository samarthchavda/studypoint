#!/bin/bash

# StudyNotion - Quick Deployment Script for Vercel
# This script helps you deploy your full-stack application to Vercel

echo "🚀 StudyNotion Vercel Deployment Script"
echo "========================================"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed."
    echo "📦 Installing Vercel CLI globally..."
    npm install -g vercel
    echo "✅ Vercel CLI installed successfully!"
    echo ""
fi

# Check if user is logged in
echo "🔐 Checking Vercel authentication..."
vercel whoami &> /dev/null
if [ $? -ne 0 ]; then
    echo "❌ Not logged in to Vercel."
    echo "🔑 Please login to Vercel..."
    vercel login
    echo ""
fi

echo "✅ Logged in to Vercel successfully!"
echo ""

# Show current environment variables reminder
echo "⚠️  IMPORTANT: Environment Variables Required"
echo "=============================================="
echo ""
echo "Make sure you have these ready:"
echo "  1. MongoDB connection string (MONGODB_URL)"
echo "  2. JWT secret key (JWT_SECRET)"
echo "  3. Gmail credentials (MAIL_USER, MAIL_PASS)"
echo "  4. Razorpay keys (RAZORPAY_KEY, RAZORPAY_SECRET)"
echo "  5. Cloudinary credentials (CLOUD_NAME, API_KEY, API_SECRET)"
echo ""
echo "📝 See server/.env.example for full list"
echo ""

read -p "Do you have all environment variables ready? (y/n): " ready

if [ "$ready" != "y" ] && [ "$ready" != "Y" ]; then
    echo ""
    echo "📋 Please prepare your environment variables first."
    echo "📝 Check server/.env.example for the complete list"
    echo "📖 Read LIVE_DEPLOYMENT_GUIDE.md for detailed instructions"
    exit 1
fi

echo ""
echo "🚀 Starting deployment..."
echo ""

# Deploy to Vercel
vercel --prod

echo ""
echo "🎉 Deployment initiated!"
echo ""
echo "📝 Next Steps:"
echo "============="
echo ""
echo "1. ⚙️  Go to your Vercel Dashboard: https://vercel.com/dashboard"
echo "2. 📁 Click on your project"
echo "3. ⚙️  Go to Settings → Environment Variables"
echo "4. ➕ Add all required environment variables (see server/.env.example)"
echo "5. 🔄 Redeploy the project after adding variables"
echo ""
echo "📖 For detailed instructions, see: LIVE_DEPLOYMENT_GUIDE.md"
echo ""
echo "✅ Your app will be live at: https://your-project-name.vercel.app"
echo ""
