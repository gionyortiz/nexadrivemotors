const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
const ADMIN_PASS = 'admin123';
const DB_FILE = path.join(__dirname, 'vehicles.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..')));

// Initialize database
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ vehicles: [], nextId: 1 }, null, 2));
}

// Helper functions
function readDB() {
  const data = fs.readFileSync(DB_FILE, 'utf8');
  return JSON.parse(data);
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server running' });
});

app.get('/api/vehicles', (req, res) => {
  const db = readDB();
  let vehicles = db.vehicles;

  // Filter by query params
  const { make, min_price, max_price, year, q } = req.query;
  
  if (make) vehicles = vehicles.filter(v => v.make.toLowerCase() === make.toLowerCase());
  if (year) vehicles = vehicles.filter(v => v.year == year);
  if (min_price) vehicles = vehicles.filter(v => v.price >= parseInt(min_price));
  if (max_price) vehicles = vehicles.filter(v => v.price <= parseInt(max_price));
  if (q) {
    const search = q.toLowerCase();
    vehicles = vehicles.filter(v => 
      v.title.toLowerCase().includes(search) ||
      v.make.toLowerCase().includes(search) ||
      v.model.toLowerCase().includes(search)
    );
  }

  res.json(vehicles);
});

app.get('/api/vehicles/:id', (req, res) => {
  const db = readDB();
  const vehicle = db.vehicles.find(v => v.id == req.params.id);
  
  if (!vehicle) {
    return res.status(404).json({ error: 'Vehicle not found' });
  }
  
  res.json(vehicle);
});

app.post('/api/vehicles', (req, res) => {
  // Check admin auth
  if (req.headers['x-admin-pass'] !== ADMIN_PASS) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const db = readDB();
  const vehicle = {
    id: db.nextId++,
    ...req.body,
    created_at: new Date().toISOString()
  };

  db.vehicles.push(vehicle);
  writeDB(db);

  res.status(201).json(vehicle);
});

app.put('/api/vehicles/:id', (req, res) => {
  // Check admin auth
  if (req.headers['x-admin-pass'] !== ADMIN_PASS) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const db = readDB();
  const index = db.vehicles.findIndex(v => v.id == req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Vehicle not found' });
  }

  db.vehicles[index] = {
    ...db.vehicles[index],
    ...req.body,
    id: parseInt(req.params.id)
  };

  writeDB(db);
  res.json(db.vehicles[index]);
});

app.delete('/api/vehicles/:id', (req, res) => {
  // Check admin auth
  if (req.headers['x-admin-pass'] !== ADMIN_PASS) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const db = readDB();
  const index = db.vehicles.findIndex(v => v.id == req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Vehicle not found' });
  }

  db.vehicles.splice(index, 1);
  writeDB(db);

  res.json({ success: true, deleted: parseInt(req.params.id) });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message, phone } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  // Log contact submission
  console.log('Contact form submission:', { name, email, phone, message, date: new Date().toISOString() });

  res.json({ success: true, message: 'Thank you for contacting us!' });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`📊 Admin password: ${ADMIN_PASS}`);
  console.log(`📁 Database: ${DB_FILE}`);
  console.log(`\n🌐 Open: http://localhost:${PORT}/inventory.html`);
});

// Keep alive
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server closed');
  });
});
