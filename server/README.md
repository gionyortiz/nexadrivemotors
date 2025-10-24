# NexaDriveMotors Backend

Simple Node.js/Express backend for the car dealership website.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Seed the database:
```bash
npm run seed
```

3. Start the server:
```bash
npm start
```

Server runs at: http://localhost:3000

## API Endpoints

### Public
- `GET /api/health` - Health check
- `GET /api/vehicles` - List vehicles (filters: make, year, min_price, max_price, q)
- `GET /api/vehicles/:id` - Get vehicle by ID
- `POST /api/contact` - Submit contact form

### Admin (requires header: `x-admin-pass: admin123`)
- `POST /api/vehicles` - Create vehicle
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

## Admin Password
Default: `admin123`

## Database
JSON file-based storage in `vehicles.json`
