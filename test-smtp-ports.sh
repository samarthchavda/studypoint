#!/bin/bash

echo "🔍 Testing SMTP Ports Accessibility"
echo "===================================="
echo ""

# Test port 465 (SSL)
echo "Test 1: Port 465 (SSL) - Gmail"
echo "------------------------------"
timeout 5 bash -c "cat < /dev/null > /dev/tcp/smtp.gmail.com/465" 2>/dev/null
if [ $? -eq 0 ]; then
    echo "✅ Port 465 is OPEN and accessible"
else
    echo "❌ Port 465 is BLOCKED or unreachable"
fi
echo ""

# Test port 587 (TLS)
echo "Test 2: Port 587 (TLS) - Gmail"
echo "------------------------------"
timeout 5 bash -c "cat < /dev/null > /dev/tcp/smtp.gmail.com/587" 2>/dev/null
if [ $? -eq 0 ]; then
    echo "✅ Port 587 is OPEN and accessible"
else
    echo "❌ Port 587 is BLOCKED or unreachable"
fi
echo ""

# Test port 25 (Standard SMTP)
echo "Test 3: Port 25 (Standard SMTP) - Gmail"
echo "----------------------------------------"
timeout 5 bash -c "cat < /dev/null > /dev/tcp/smtp.gmail.com/25" 2>/dev/null
if [ $? -eq 0 ]; then
    echo "✅ Port 25 is OPEN and accessible"
else
    echo "❌ Port 25 is BLOCKED or unreachable"
fi
echo ""

echo "===================================="
echo "Note: Run this on your Render server to check which ports work"
echo "On Render: Go to Shell tab and run: bash test-smtp-ports.sh"
