const express = require('express');
const app = express();
const port = 3000;


app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Readiness probe - checks if app is ready to serve traffic
app.get('/ready', async (req, res) => {
  try {
    // Add checks for dependencies (database, cache, etc.)
    // Example: await db.ping();
    
    res.status(200).json({ status: 'ready' });
  } catch (error) {
    res.status(503).json({ status: 'not ready', error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('<h1>Hello World </h1><p>This is a simple Node.js web app!</p>');
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
