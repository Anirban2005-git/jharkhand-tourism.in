# 🚀 Razorpay Integration Setup Guide

## ✅ What's Been Updated

I've successfully integrated Razorpay payment gateway into your Jharkhand Tourism application:

### Backend Changes:
- **package.json**: Replaced Stripe with Razorpay dependency
- **config.js**: Updated with Razorpay configuration
- **routes/payments.js**: Complete Razorpay integration with order creation and verification
- **models/Payment.js**: Updated to use Razorpay fields (razorpayOrderId, razorpayPaymentId)

### Frontend Changes:
- **digital_certification.html**: Updated payment flow to use Razorpay
- **js/api.js**: Added Razorpay API methods (createOrder, verifyPayment)

## 🔑 Razorpay Keys Setup

### Step 1: Get Your Razorpay Keys
1. Go to https://dashboard.razorpay.com/
2. Sign up/Login to your Razorpay account
3. Go to Settings → API Keys
4. Generate Test API Keys (for development)

### Step 2: Update Configuration Files

**Backend Files:**
- `config.js` (line 13): Replace `"rzp_test_your_key_id_here"` with your Razorpay Key ID
- `config.js` (line 14): Replace `"your_razorpay_key_secret_here"` with your Razorpay Key Secret

**Frontend Files:**
- `digital_certification.html` (line 420): Replace `"rzp_test_your_key_id_here"` with your Razorpay Key ID

### Step 3: Install Razorpay Dependency
```bash
cd /Users/debanjanchoubey/Desktop/backend
npm install razorpay
```

## 🌐 Razorpay API Endpoints

### Backend Endpoints:
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify-payment` - Verify payment signature
- `POST /api/payments/webhook` - Handle Razorpay webhooks

### Frontend Integration:
- Razorpay checkout modal integration
- Payment verification flow
- Error handling and user feedback

## 🎯 Payment Flow

1. **User clicks "Pay Now"** → Creates Razorpay order
2. **Razorpay modal opens** → User enters payment details
3. **Payment successful** → Verifies payment signature
4. **Database updated** → Payment status changed to 'completed'
5. **User notified** → Success message displayed

## 🔧 Testing

### Test Cards (Razorpay Test Mode):
- **Success**: 4111 1111 1111 1111
- **Failure**: 4000 0000 0000 0002
- **CVV**: Any 3 digits
- **Expiry**: Any future date

### Test Your Integration:
1. Start server: `npm start`
2. Visit: http://localhost:3000
3. Go to Digital Certification page
4. Create a certificate and try payment

## 🚨 Important Notes

- **Test Mode**: Use test keys for development
- **Production**: Switch to live keys for production
- **Webhooks**: Configure webhook URL in Razorpay dashboard
- **Security**: Never expose your key secret in frontend code

## 🎉 You're All Set!

Your Jharkhand Tourism application now has full Razorpay integration for:
- Certificate payments
- Booking payments
- Admin payment tracking
- Real-time payment verification

Enjoy your new payment system! 💳✨
