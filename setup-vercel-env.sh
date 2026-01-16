#!/bin/bash

# Script to add all environment variables to Vercel
# Run this script from the project root directory

echo "🚀 Adding Environment Variables to Vercel..."
echo ""
echo "⚠️  You will be prompted for each value. Have them ready!"
echo ""

# Add backend environment variables
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
vercel env add PORT production

# Add frontend environment variable
vercel env add REACT_APP_BASE_URL production

echo ""
echo "✅ All environment variables added!"
echo ""
echo "🔄 Now redeploying with new environment variables..."
vercel --prod

echo ""
echo "🎉 Deployment complete!"
echo "Visit your app at: https://studynotion-app-rho.vercel.app"
