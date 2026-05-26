// Simple OTP backend using Express and Twilio (or console fallback)
try {
  require("dotenv").config();
} catch (e) {
  console.warn("Optional dependency 'dotenv' not found – skipping .env loading.");
}

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// In-memory store: NOT for production
const otpStore = new Map(); // phone -> { otp, expiresAt, resendAfter }

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function getTwilioClient() {
  // 👉 Your Twilio Account-SID fallback
  const sid =
    process.env.TWILIO_ACCOUNT_SID || "6LAJ1CZ6JW6J95AEMLPHHPHS";
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const twilio = require("twilio");
    return twilio(sid, token);
  } catch (e) {
    return null;
  }
}

app.post('/api/send-otp', async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone || typeof phone !== 'string') {
      return res.status(400).json({ ok: false, error: 'Invalid phone' });
    }

    const now = Date.now();
    const record = otpStore.get(phone);
    if (record && record.resendAfter && now < record.resendAfter) {
      const waitMs = record.resendAfter - now;
      return res.status(429).json({ ok: false, error: 'Resend not allowed yet', retryAfterMs: waitMs });
    }

    const otp = generateOtp();
    const expiresAt = now + 5 * 60 * 1000; // 5 minutes
    const resendAfter = now + 2 * 60 * 1000; // 2 minutes cooldown
    otpStore.set(phone, { otp, expiresAt, resendAfter });

    const msg = `Your verification code is ${otp}. It expires in 5 minutes.`;

    const client = getTwilioClient();
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;
    if (client && fromNumber) {
      try {
        await client.messages.create({
          from: fromNumber,
          to: phone,
          body: msg,
        });
      } catch (e) {
        // Fallback to console if Twilio fails
        console.log('[OTP][Twilio failed]. Phone:', phone, 'OTP:', otp, 'Error:', e.message);
      }
    } else {
      console.log('[OTP][Console fallback] Phone:', phone, 'OTP:', otp);
    }

    return res.json({ ok: true, resendAfterMs: 2 * 60 * 1000 });
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
});

app.post('/api/verify-otp', (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || typeof phone !== 'string' || !otp || typeof otp !== 'string') {
      return res.status(400).json({ ok: false, error: 'Invalid payload' });
    }
    const record = otpStore.get(phone);
    if (!record) return res.status(400).json({ ok: false, error: 'No OTP requested' });
    if (Date.now() > record.expiresAt) {
      otpStore.delete(phone);
      return res.status(400).json({ ok: false, error: 'OTP expired' });
    }
    if (record.otp !== otp) {
      return res.status(400).json({ ok: false, error: 'Incorrect OTP' });
    }
    // Success: clear OTP so it cannot be reused
    otpStore.delete(phone);
    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`OTP server running on http://localhost:${PORT}`);
});

