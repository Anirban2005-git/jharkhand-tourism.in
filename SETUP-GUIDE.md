# 🚀 Jharkhand Tourism - Complete Setup Guide

## ✅ What's Already Done

Your full-stack application is ready! Here's what has been created:

### Backend (Node.js + Express + SQLite)
- ✅ Complete API server with all endpoints
- ✅ Database models and relationships
- ✅ Authentication with JWT
- ✅ Stripe payment integration
- ✅ Admin dashboard functionality

### Frontend (Updated HTML files)
- ✅ Dynamic data loading from backend APIs
- ✅ Admin login and dashboard
- ✅ Payment integration with Stripe
- ✅ Responsive design maintained

## 🔧 Setup Instructions

### Step 1: Install Dependencies
```bash
cd /Users/debanjanchoubey/Desktop/backend
npm install
```

### Step 2: Initialize Database
```bash
npm run seed
```

### Step 3: Start the Server
```bash
npm start
```

### Step 4: Access Your Application
- **Frontend**: Open `dummy.sih/main.html` in your browser
- **Backend API**: http://localhost:3000
- **Admin Login**: username `admin`, password `admin123`

## 🔑 Stripe Keys Setup

**IMPORTANT**: Replace these placeholder keys with your actual Stripe keys:

### 1. Get Your Stripe Keys
- Go to: https://dashboard.stripe.com/test/apikeys
- Copy your **Secret key** (starts with `sk_test_...`)
- Copy your **Publishable key** (starts with `pk_test_...`)

### 2. Update the Keys in These Files:

**Backend Files:**
- `config.js` (line 12): Replace `"sk_test_your_actual_secret_key_here"`
- `routes/payments.js` (line 2): Replace `"sk_test_your_actual_secret_key_here"`

**Frontend Files:**
- `dummy.sih/digital_certification.html` (line 408): Replace `"pk_test_your_actual_publishable_key_here"`

## 🌐 API Endpoints

### Public Endpoints (No Auth Required)
- `GET /api/destinations` - Get all destinations
- `GET /api/events` - Get all cultural events
- `GET /api/providers` - Get all service providers

### Authentication Endpoints
- `POST /api/login` - Admin login
- `POST /api/register` - Admin registration

### Protected Admin Endpoints (Requires JWT)
- `GET /api/admin/dashboard-stats` - Dashboard statistics
- `GET /api/admin/payments` - All payments
- `POST /api/admin/certificates/issue` - Issue certificates

### Payment Endpoints
- `POST /api/payments/create-payment-intent` - Create Stripe payment
- `POST /api/payments/webhook` - Stripe webhook handler

## 🎯 Key Features

### For Visitors
- Browse destinations and events dynamically
- View service providers
- Interactive maps and AR/VR experiences
- Cultural event information

### For Admins
- Secure login system
- Dashboard with analytics
- Certificate issuance
- Payment management
- Real-time statistics

### Payment System
- Stripe integration for secure payments
- Payment tracking and management
- Webhook handling for payment confirmations

## 🚨 Troubleshooting

### If Server Won't Start
1. Make sure you're in the backend directory: `cd /Users/debanjanchoubey/Desktop/backend`
2. Install dependencies: `npm install`
3. Check for errors in the console

### If Frontend Can't Connect to Backend
1. Make sure the backend server is running on port 3000
2. Check browser console for CORS errors
3. Verify API endpoints are accessible

### If Stripe Payments Don't Work
1. Make sure you've replaced the placeholder keys with real Stripe keys
2. Check Stripe dashboard for test mode
3. Verify webhook endpoints are configured

## 🎉 You're All Set!

Your Jharkhand Tourism application is now a fully functional full-stack web application with:
- Dynamic content management
- Secure admin authentication
- Payment processing
- Real-time analytics
- Professional UI/UX

Enjoy your new tourism platform! 🏞️✨
