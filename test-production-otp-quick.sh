#!/bin/bash

# Quick script to test if OTP is working on production

echo "🧪 Testing Production OTP..."
echo ""
echo "Backend URL: https://studypoint-1-r4wb.onrender.com"
echo ""

# Test 1: Check if backend is alive
echo "Test 1: Checking if backend is running..."
HEALTH_CHECK=$(curl -s https://studypoint-1-r4wb.onrender.com/api/v1/health)
echo "✅ Response: $HEALTH_CHECK"
echo ""

# Test 2: Try to send OTP
echo "Test 2: Attempting to send OTP..."
echo "Enter your email address:"
read EMAIL

echo "Sending OTP request to $EMAIL..."

RESPONSE=$(curl -s -X POST https://studypoint-1-r4wb.onrender.com/api/v1/auth/sendotp \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\"}")

echo ""
echo "📬 Response:"
echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"
echo ""

# Parse response
if echo "$RESPONSE" | grep -q '"success":true'; then
  echo "✅ SUCCESS: OTP request accepted!"
  echo "📧 Check your email: $EMAIL"
  echo ""
  echo "If email not received:"
  echo "1. Check spam folder"
  echo "2. View Render logs: https://dashboard.render.com → Logs"
  echo "3. Verify email credentials in Render environment variables"
else
  echo "❌ FAILED: OTP request failed"
  echo ""
  echo "Common fixes:"
  echo "1. Add SENDGRID_API_KEY to Render (recommended)"
  echo "   OR"
  echo "2. Update MAIL_USER and MAIL_PASS in Render"
  echo "3. Check Render logs for detailed error"
  echo ""
  echo "View logs: https://dashboard.render.com → Select service → Logs"
fi

echo ""
echo "📖 For detailed fix guide, see: PRODUCTION_OTP_FIX.md"
