#!/bin/bash

echo "🚀 Starting Jharkhand Tourism Backend Server..."

# Check if port 3000 is in use
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 3000 is already in use. Killing existing processes..."
    pkill -f "node.*server"
    sleep 2
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the server
echo "🌐 Starting server on http://localhost:3000"
node server.js

