# 🔧 Troubleshooting "Payment failed: Failed to create payment order"

## Quick Fix Steps

### 1. Start the Backend Server
```bash
cd /Users/debanjanchoubey/Desktop/backend
npm start
```

### 2. Check if Server is Running
Open a new terminal and run:
```bash
curl http://localhost:3000/api/health
```

You should see:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "environment": "development"
}
```

### 3. If Server Won't Start

**Option A: Use the startup script**
```bash
cd /Users/debanjanchoubey/Desktop/backend
./start-server.sh
```

**Option B: Manual steps**
```bash
# Kill any existing processes
pkill -f "node.*server"

# Install dependencies
npm install

# Start server
npm start
```

### 4. Check for Port Conflicts
```bash
# Check what's using port 3000
lsof -ti:3000

# Kill processes using port 3000
pkill -f ":3000"
```

## Common Issues & Solutions

### Issue 1: "EADDRINUSE: address already in use :::3000"
**Solution:** Kill existing processes and restart
```bash
pkill -f "node.*server"
npm start
```

### Issue 2: "Module not found" errors
**Solution:** Install dependencies
```bash
npm install
```

### Issue 3: Razorpay keys not set
**Solution:** Update your Razorpay keys in:
- `backend/config.js` (lines 13-14)
- `digitalanother.html` (line 982)

### Issue 4: CORS errors
**Solution:** The server already has CORS enabled, but if you see CORS errors, make sure you're accessing via `http://localhost:3000`

## Test the Integration

1. **Start server**: `npm start` (in backend directory)
2. **Visit**: http://localhost:3000/digitalanother.html
3. **Click "Book Now"** on any provider card
4. **Click "Proceed to Pay"** - should open Razorpay modal

## Still Having Issues?

1. Check browser console for detailed error messages
2. Check server terminal for error logs
3. Make sure Razorpay keys are properly set
4. Verify the server is running on port 3000

The error "Failed to create payment order" usually means the backend server isn't running or there's a connection issue.

