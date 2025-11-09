#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔍 Checking for existing server on port 4000...${NC}"

# Kill any process using port 4000
PID=$(lsof -ti:4000)
if [ ! -z "$PID" ]; then
    echo -e "${RED}❌ Found existing process on port 4000 (PID: $PID)${NC}"
    echo -e "${YELLOW}🔪 Killing process...${NC}"
    kill -9 $PID
    sleep 1
    echo -e "${GREEN}✅ Process killed successfully${NC}"
else
    echo -e "${GREEN}✅ Port 4000 is free${NC}"
fi

echo -e "${GREEN}🚀 Starting server...${NC}\n"

# Start the server
npm run dev
