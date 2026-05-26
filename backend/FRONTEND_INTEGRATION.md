# Connecting Your Frontend to the Razorpay Backend

Follow these steps to connect your existing HTML/JavaScript frontend to the Node.js backend:

## Step 1: Start the Backend Server

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

## Step 2: Update Your Frontend Code

Your frontend code in `digitalanother.html` is already set up to work with the backend. Just make sure:

1. The Razorpay script is included:
   ```html
   <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
   ```

2. The API endpoints match what the backend provides:
   - `/api/health` - Health check
   - `/api/payments/create-order` - Create Razorpay order
   - `/api/payments/verify-payment` - Verify payment

## Step 3: Test the Integration

1. Start both your frontend and backend servers
2. Click "Book Now" on any provider card
3. Click "Proceed to Pay" in the modal
4. The Razorpay payment window should open
5. Use Razorpay test cards to complete the payment:
   - Card Number: 4111 1111 1111 1111
   - Expiry: Any future date
   - CVV: Any 3 digits
   - Name: Any name

## Troubleshooting

If you encounter issues:

1. **"Server is not running" error**:
   - Make sure the backend server is running on port 5000
   - Check that the frontend can reach the backend (no CORS issues)

2. **Payment creation fails**:
   - Verify your Razorpay API keys in the `.env` file
   - Check the server logs for detailed error messages

3. **Payment verification fails**:
   - Ensure the signature verification is working correctly
   - Check that all required parameters are being passed correctly

## Next Steps for Production

Before deploying to production:

1. Replace test API keys with production Razorpay keys
2. Implement a proper database for storing payment information
3. Add user authentication for secure payments
4. Set up proper error handling and logging