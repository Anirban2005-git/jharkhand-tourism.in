import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running with ES modules!',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'ES modules are working correctly!',
    data: {
      destinations: [
        { id: 1, name: 'Hundru Falls', category: 'Waterfall' },
        { id: 2, name: 'Betla National Park', category: 'Wildlife' }
      ]
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Simple server running on http://localhost:${PORT}`);
  console.log(`📊 Test API: http://localhost:${PORT}/api/test`);
});
