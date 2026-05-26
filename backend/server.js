const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Store payment details (in-memory database for demo)
// In production, use a real database
const payments = {};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Create Razorpay order
app.post('/api/payments/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', providerId } = req.body;
    
    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    // Create unique payment ID
    const paymentId = 'pay_' + Date.now();
    
    // Create Razorpay order
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        providerId: providerId || 'default',
        paymentId
      }
    };

    const order = await razorpay.orders.create(options);
    
    // Store payment details
    payments[paymentId] = {
      id: paymentId,
      orderId: order.id,
      amount,
      currency,
      providerId,
      status: 'created',
      createdAt: new Date()
    };

    res.status(200).json({
      success: true,
      order,
      paymentId
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      error: 'Failed to create order: ' + error.message
    });
  }
});

// Verify payment
app.post('/api/payments/verify-payment', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentId
    } = req.body;

    // Verify signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: 'Invalid signature'
      });
    }

    // Update payment status
    if (payments[paymentId]) {
      payments[paymentId].status = 'paid';
      payments[paymentId].razorpayPaymentId = razorpay_payment_id;
      payments[paymentId].updatedAt = new Date();
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      payment: payments[paymentId]
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      error: 'Payment verification failed: ' + error.message
    });
  }
});

// Get all payments (for admin)
app.get('/api/admin/payments', (req, res) => {
  const paymentList = Object.values(payments);
  res.status(200).json({
    success: true,
    payments: paymentList
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});