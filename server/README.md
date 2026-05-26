# Booking Server Sample

This folder contains a minimal Express server demonstrating:

- A `/api/bookings` endpoint your front-end can POST to when a user submits the contact form.
- A webhook receiver for WhatsApp Cloud API (`/webhook`) that replies to incoming messages with a simple auto-reply.

## Quick start

1. Copy `.env.example` to `.env` and fill in your credentials.

2. Install dependencies and run:

```bash
cd server
npm install
node index.js
```

3. Expose the server for testing with ngrok (or any tunneling):

```bash
ngrok http 3000
```

4. In the Meta App dashboard add the ngrok HTTPS URL as your webhook callback and set the verify token to the value in `.env`.

5. Send a WhatsApp message to the configured phone number; the webhook will reply automatically.

## Notes
- The example uses the Meta Cloud API; you can replace `sendWhatsAppText` with Twilio's API if you prefer.
- Keep tokens secure and never commit `.env` to source control.

## Business-initiated messages & templates

Meta often requires pre-approved message templates for business-initiated conversations (when you send the first message to a user). The server will try a plain text send first and, if the API rejects because a template is required, it will attempt a template fallback using the `WHATSAPP_TEMPLATE_NAME` environment variable.

How to prepare a template:

- In Meta Business Manager create a message template and submit it for approval. Use variables if you need name/date placeholders.
- Set the approved template's name into your `.env` as `WHATSAPP_TEMPLATE_NAME` and optionally `WHATSAPP_TEMPLATE_LANGUAGE` (defaults to `en_US`).

Testing tips:

- Start the server: `node index.js`.
- Run `ngrok http 3000` and add the HTTPS URL to your Meta App webhook settings.
- Use the test script (`node test-send-booking.js`) or post from the front-end; inspect server logs for whether `Replied to` or `Template sent to` messages appear.

If you still don't receive a message in WhatsApp, check:

- That `WHATSAPP_ACCESS_TOKEN` is valid and hasn't expired.
- The `WHATSAPP_PHONE_ID` is the phone number ID from your Meta App, not the phone number itself.
- That the user number is in a supported format (E.164 digits), and that the user has previously messaged the business if you need to avoid templates.
