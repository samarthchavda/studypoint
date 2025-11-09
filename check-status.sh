#!/bin/bash

# StudyNotion Server Status Check Script

echo "═══════════════════════════════════════════════════════════"
echo "         StudyNotion Server Status Check"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Check MongoDB
if pgrep -x mongod > /dev/null; then
    echo "✅ MongoDB is running"
else
    echo "❌ MongoDB is NOT running"
    echo "   Start it with: brew services start mongodb-community"
fi

# Check Backend Server (port 4000)
if lsof -ti:4000 > /dev/null; then
    echo "✅ Backend server is running on port 4000"
    if curl -s http://localhost:4000 > /dev/null; then
        echo "   └─ Server is responding to requests"
    else
        echo "   └─ ⚠️  Server not responding"
    fi
else
    echo "❌ Backend server is NOT running on port 4000"
    echo "   Start it with: cd server && npm run dev"
fi

# Check Frontend (port 3000)
if lsof -ti:3000 > /dev/null; then
    echo "✅ Frontend is running on port 3000"
else
    echo "❌ Frontend is NOT running on port 3000"
    echo "   Start it with: npm start"
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "URLs:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:4000"
echo "═══════════════════════════════════════════════════════════"
