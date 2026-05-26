# Razorpay Payment Backend

A Node.js backend for handling Razorpay payment integration.

## Setup Instructions

1. **Install dependencies**
   ```
   npm install
   ```

2. **Configure environment variables**
   - Rename `.env.example` to `.env` (or create a new `.env` file)
   - Add your Razorpay API keys:
     ```
     PORT=5000
     RAZORPAY_KEY_ID=your_razorpay_key_id
     RAZORPAY_KEY_SECRET=your_razorpay_key_secret
     ```

3. **Start the server**
   ```
   npm start
   ```
   For development with auto-reload:
   ```
   npm run dev
   ```

4. **Verify the server is running**
   - Open your browser and go to: http://localhost:5000/api/health
   - You should see: `{"status":"ok","message":"Server is running"}`

## API Endpoints

### Health Check
- **GET** `/api/health`
  - Returns server status

### Create Payment Order
- **POST** `/api/payments/create-order`
  - Request body:
    ```json
    {
      "amount": 500,
      "currency": "INR",
      "providerId": "1"
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "order": {
        "id": "order_123456789",
        "amount": 50000,
        "currency": "INR",
        ...
      },
      "paymentId": "pay_123456789"
    }
    ```

### Verify Payment
- **POST** `/api/payments/verify-payment`
  - Request body:
    ```json
    {
      "razorpay_order_id": "order_123456789",
      "razorpay_payment_id": "pay_123456789",
      "razorpay_signature": "signature_string",
      "paymentId": "pay_123456789"
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "message": "Payment verified successfully",
      "payment": {
        "id": "pay_123456789",
        "status": "paid",
        ...
      }
    }
    ```

### Admin: Get All Payments
- **GET** `/api/admin/payments`
  - Returns list of all payments