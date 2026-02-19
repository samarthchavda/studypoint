#!/bin/bash

echo "🔍 Testing Production OTP System"
echo "================================"
echo ""

# Backend URL
BACKEND_URL="https://studypoint-1-r4wb.onrender.com"
TEST_EMAIL="chavdasamarth02@gmail.com"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "📍 Backend URL: $BACKEND_URL"
echo "📧 Test Email: $TEST_EMAIL"
echo ""

# Test 1: Health Check
echo "Test 1: Health Check"
echo "-------------------"
HEALTH_RESPONSE=$(curl -s "$BACKEND_URL/api/v1/health")
if [[ $HEALTH_RESPONSE == *"success"* ]]; then
    echo -e "${GREEN}✅ Backend is running${NC}"
    echo "Response: $HEALTH_RESPONSE"
else
    echo -e "${RED}❌ Backend is not responding${NC}"
    echo "Response: $HEALTH_RESPONSE"
    exit 1
fi
echo ""

# Test 2: OTP Endpoint
echo "Test 2: Send OTP"
echo "---------------"
echo "Sending OTP to $TEST_EMAIL..."
OTP_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/v1/auth/sendotp" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$TEST_EMAIL\"}")

echo "Response: $OTP_RESPONSE"
echo ""

if [[ $OTP_RESPONSE == *"success\":true"* ]]; then
    echo -e "${GREEN}✅ OTP request successful!${NC}"
    echo -e "${GREEN}Check your email: $TEST_EMAIL${NC}"
elif [[ $OTP_RESPONSE == *"already registered"* ]]; then
    echo -e "${YELLOW}⚠️  Email already registered. Try with different email.${NC}"
elif [[ $OTP_RESPONSE == *"error"* ]] || [[ $OTP_RESPONSE == *"failed"* ]]; then
    echo -e "${RED}❌ OTP sending failed!${NC}"
    echo ""
    echo "Possible issues:"
    echo "1. Email credentials not set in Render"
    echo "2. Gmail App Password expired or wrong"
    echo "3. SMTP connection issue"
    echo ""
    echo "Check Render logs at:"
    echo "https://dashboard.render.com"
else
    echo -e "${YELLOW}⚠️  Unexpected response${NC}"
fi
echo ""

# Test 3: Check CORS
echo "Test 3: CORS Check"
echo "-----------------"
echo "Testing CORS headers..."
CORS_RESPONSE=$(curl -s -X OPTIONS "$BACKEND_URL/api/v1/auth/sendotp" \
    -H "Origin: https://studynotion-app-rho.vercel.app" \
    -H "Access-Control-Request-Method: POST" \
    -v 2>&1)

if [[ $CORS_RESPONSE == *"Access-Control-Allow-Origin"* ]]; then
    echo -e "${GREEN}✅ CORS is configured${NC}"
else
    echo -e "${YELLOW}⚠️  CORS might be an issue${NC}"
    echo "Make sure FRONTEND_URL is set correctly in Render"
fi
echo ""

echo "================================"
echo "🏁 Test Complete"
echo ""
echo "Next steps:"
echo "1. If OTP test passed, check your email inbox"
echo "2. If failed, check Render logs for detailed errors"
echo "3. Verify all environment variables are set in Render"
echo ""
echo "Render Dashboard: https://dashboard.render.com"
echo "Vercel Dashboard: https://vercel.com/dashboard"
