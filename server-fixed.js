import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Fix __dirname because it's not available in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'file://'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../dummy.sih')));

// Simple API routes for testing
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: 'development'
  });
});

app.get('/api/destinations', (req, res) => {
  res.json({
    destinations: [
      {
        id: 1,
        name: 'Hundru Falls',
        category: 'Waterfall',
        description: 'A spectacular cascade plunging from a height of 320 feet',
        historicalBackground: 'Located in Ranchi district, Hundru Falls is one of the most popular tourist destinations in Jharkhand.',
        bestTimeVisit: 'October to March',
        entryFee: '₹50 per person',
        foodCostRange: '₹200-500 per meal',
        travelCostEstimate: '₹1000-2000 from Ranchi',
        stayCostPerNight: '₹1500-3000'
      },
      {
        id: 2,
        name: 'Betla National Park',
        category: 'Wildlife',
        description: 'Home to diverse flora and fauna including tigers, elephants, and various bird species',
        historicalBackground: 'Established in 1986, this national park is located in Palamu district.',
        bestTimeVisit: 'November to April',
        entryFee: '₹100 per person',
        foodCostRange: '₹300-600 per meal',
        travelCostEstimate: '₹2000-3000 from Ranchi',
        stayCostPerNight: '₹2000-4000'
      }
    ]
  });
});

app.get('/api/events', (req, res) => {
  res.json({
    events: [
      {
        id: 1,
        name: 'Sarhul Festival',
        date: 'March-April',
        location: 'Various tribal villages',
        description: 'Spring festival celebrating nature and harvest',
        category: 'Religious'
      },
      {
        id: 2,
        name: 'Karma Festival',
        date: 'August-September',
        location: 'Throughout Jharkhand',
        description: 'Harvest festival with traditional dances and songs',
        category: 'Cultural'
      }
    ]
  });
});

app.get('/api/providers', (req, res) => {
  res.json({
    providers: [
      {
        id: 1,
        name: 'Jharkhand Tourism Guide',
        category: 'Tour Guide',
        description: 'Professional tour guides for Jharkhand destinations',
        rating: 4.8,
        priceRange: '₹2000-5000 per day'
      }
    ]
  });
});

// Serve the main HTML file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dummy.sih/main.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
  console.log(`🌐 Frontend served from http://localhost:${PORT}`);
  console.log(`Environment: development`);
});
