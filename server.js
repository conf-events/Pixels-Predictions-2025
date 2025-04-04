const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

const DATA_PATH = path.join(__dirname, 'data.json');

// Helper: Load and Save JSON
function readData() {
  if (!fs.existsSync(DATA_PATH)) return { subscribers: [], registrations: [] };
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
}

function writeData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

// API: Subscribe to updates
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const data = readData();
  const exists = data.subscribers.includes(email.toLowerCase());

  if (exists) {
    return res.status(400).json({ message: 'Email already subscribed.' });
  }

  data.subscribers.push(email.toLowerCase());
  writeData(data);
  res.json({ message: 'Subscribed successfully!' });
});

// API: Conference registration
app.post('/api/register', (req, res) => {
  const { name, surname, email } = req.body;
  if (!name || !surname || !email) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const data = readData();
  const exists = data.registrations.find(r => r.email.toLowerCase() === email.toLowerCase());

  if (exists) {
    return res.status(400).json({ message: 'Email already registered.' });
  }

  data.registrations.push({ name, surname, email: email.toLowerCase() });
  writeData(data);
  res.json({ message: 'Registered successfully!' });
});

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
