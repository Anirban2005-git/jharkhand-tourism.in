import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5501;

// Serve current workspace directory statically
app.use(express.static(__dirname));

// Default route: show welcome.html if present
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'welcome.html'));
});

app.listen(PORT, () => {
  console.log(`Preview server running at http://localhost:${PORT}/`);
  console.log(`Open welcome flow at http://localhost:${PORT}/welcome.html`);
  console.log(`New page at http://localhost:${PORT}/welcome_jharkhand.html`);
});