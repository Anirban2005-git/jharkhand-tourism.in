require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.BOOKING_PORT || 3000;

// Simple bookings store (in-memory for demo)
const bookings = [];

// Booking endpoint used by the front-end
app.post('/api/bookings', (req, res) => {
  const { name, contact, checkin, checkout, guests, notes } = req.body;
  if (!name || !contact) return res.status(400).json({ error: 'name and contact required' });
  const id = bookings.length + 1;
  const booking = { id, name, contact, checkin, checkout, guests, notes, createdAt: new Date().toISOString() };
  bookings.push(booking);
  console.log('New booking received:', booking);

  // Try to auto-reply via WhatsApp Cloud API (if configured)
  (async () => {
    try {
      const to = normalizePhone(contact);
      if (to) {
        const msg = `🌿 Hi ${name}, thanks for your booking request! We received your request for ${checkin || 'N/A'} - ${checkout || 'N/A'}. Our team will contact you shortly.`;
        const res = await sendWhatsAppText(to, msg);
        if (!res.ok) {
          // If sending plain text failed, try template fallback (business-initiated messages often require templates)
          console.log('Attempting template fallback because text send failed');
          const tplName = process.env.WHATSAPP_TEMPLATE_NAME;
          if (tplName) {
            // Optionally pass header/body params in components if your template needs them
            await sendWhatsAppTemplate(to, tplName, process.env.WHATSAPP_TEMPLATE_LANGUAGE || 'en_US', []);
          } else {
            console.log('No WHATSAPP_TEMPLATE_NAME configured, skipping template fallback');
          }
        }
      } else {
        console.log('Contact does not look like a phone number, skipping WhatsApp reply:', contact);
      }
    } catch (err) {
      console.error('Error while sending auto-reply:', err?.response?.data || err.message || err);
    }
  })();

  res.status(201).json({ success: true, bookingId: id });
});

// --- WhatsApp Cloud API webhook (Meta) verification and receiver ---
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === process.env.WEBHOOK_VERIFY_TOKEN) {
    console.log('Webhook verified');
    return res.status(200).send(challenge);
  }
  res.sendStatus(403);
});

app.post('/webhook', async (req, res) => {
  res.sendStatus(200);
  try {
    const body = req.body;
    console.log('Webhook payload', JSON.stringify(body).slice(0,1000));
    // Basic example: reply to text messages
    if (!body.entry) return;
    for (const entry of body.entry) {
      if (!entry.changes) continue;
      for (const change of entry.changes) {
        const value = change.value;
        if (!value.messages) continue;
        for (const msg of value.messages) {
          const from = msg.from;
          const text = msg.text?.body || '';
          await sendWhatsAppText(from, `🌿 Thank you for contacting Latehar Tourism! We’ve received your booking inquiry. Our team will reach out shortly.`);
        }
      }
    }
  } catch (err) {
    console.error('Webhook error', err?.response?.data || err.message || err);
  }
});

// Utility: send WhatsApp message via Meta Cloud API
async function sendWhatsAppText(to, message) {
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  if (!phoneId || !token) return;
  const url = `https://graph.facebook.com/v16.0/${phoneId}/messages`;
  try {
    await axios.post(url, {
      messaging_product: 'whatsapp',
      to,
      text: { body: message }
    }, { headers: { Authorization: `Bearer ${token}` } });
    console.log('Replied to', to);
    return { ok: true };
  } catch (err) {
    const data = err?.response?.data;
    console.error('Failed to send WhatsApp message', data || err.message || err);
    // Return error details for caller to handle
    return { ok: false, error: data || err.message };
  }
}

// Small helper to normalize a phone number into E.164-ish digits-only string for WhatsApp Cloud API
function normalizePhone(input) {
  if (!input || typeof input !== 'string') return null;
  // remove non-digits
  const digits = input.replace(/\D/g, '');
  // basic heuristics: if it starts with 0 and length 10 -> treat as local (drop leading 0)
  if (/^0\d{9}$/.test(digits)) return digits.replace(/^0/, '');
  // if already seems like international without + (like 9198...)
  if (/^[1-9]\d{7,14}$/.test(digits)) return digits;
  return null;
}

// Try sending a template message (useful for business-initiated conversations)
async function sendWhatsAppTemplate(to, templateName, language = 'en_US', components = []) {
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  if (!phoneId || !token || !templateName) return { ok: false, error: 'missing config' };
  const url = `https://graph.facebook.com/v16.0/${phoneId}/messages`;
  try {
    await axios.post(url, {
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: {
        name: templateName,
        language: { code: language },
        components
      }
    }, { headers: { Authorization: `Bearer ${token}` } });
    console.log('Template sent to', to);
    return { ok: true };
  } catch (err) {
    console.error('Failed to send template', err?.response?.data || err.message || err);
    return { ok: false, error: err?.response?.data || err.message };
  }
}

// Twilio webhook (example): if you prefer Twilio, you can configure a webhook to receive messages
app.post('/twilio-webhook', (req, res) => {
  // Twilio sends form-encoded payload; you'd need bodyParser.urlencoded()
  res.sendStatus(200);
});

app.listen(PORT, () => console.log('Server listening on', PORT));
