const axios = require('axios');

async function sendTest() {
  try {
    const res = await axios.post('http://localhost:3000/api/bookings', {
      name: 'Test User',
      contact: '919999999999',
      checkin: '2025-11-01',
      checkout: '2025-11-05',
      guests: 2,
      notes: 'This is a test booking.'
    });
    console.log('Server responded:', res.data);
  } catch (err) {
    console.error('Error sending test booking', err?.response?.data || err.message || err);
  }
}

sendTest();
