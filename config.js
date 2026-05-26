import dotenv from 'dotenv';
dotenv.config();

export default {
  database: {
    path: process.env.DB_PATH || './tourism.db'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
    expiresIn: '24h'
  },
  razorpay: {
    keyId: "rzp_test_your_key_id_here", // Replace with your actual Razorpay Key ID
    keySecret: "your_razorpay_key_secret_here", // Replace with your actual Razorpay Key Secret
    webhookSecret: "your_razorpay_webhook_secret_here" // Replace with your actual webhook secret
  },
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development'
  }
};
