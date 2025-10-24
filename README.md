# NexaDriveMotors - Professional Car Dealer Website

Welcome to NexaDriveMotors, a modern and professional car dealership website built with HTML, CSS, and JavaScript.

## Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Interactive**: Dynamic filtering, search functionality, and interactive elements
- **Multi-page**: Complete website with Home, Inventory, About, and Contact pages
- **Professional UX**: User-friendly interface with intuitive navigation

## Pages

### Home Page (`index.html`)
- Hero section with rotating car images
- Featured vehicles showcase
- Company features and benefits
- Call-to-action sections

### Inventory Page (`inventory.html`)
- Advanced filtering system (make, price, year)
- Search functionality
- Vehicle cards with detailed information
- Featured vehicle badges

### About Page (`about.html`)
- Company story and values
- Team member profiles
- Statistics showcase
- Customer testimonials
- Mission statement

### Contact Page (`contact.html`)
- Contact form with validation
- Business information cards
- Interactive map placeholder
- FAQ section

## Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Grid, Flexbox, and animations
- **JavaScript**: Interactive functionality and form handling
- **Font Awesome**: Professional icons
- **Google Fonts**: Typography (Inter font family)

## Key Features

### Responsive Design
- Mobile-first approach
- Breakpoints at 768px and 480px
- Collapsible mobile navigation
- Optimized layouts for all screen sizes

### Interactive Elements
- Smooth scrolling navigation
- Animated elements on scroll
- Image cycling in hero section
- Form validation and feedback
- Back-to-top button

### Professional Styling
- Gradient backgrounds
- Box shadows and hover effects
- Consistent color scheme
- Modern typography
- Card-based layouts

## File Structure

```
nexamotors/
├── index.html              # Homepage
├── inventory.html          # Vehicle inventory page
├── about.html             # About us page
├── contact.html           # Contact page
├── css/
│   └── styles.css         # Main stylesheet
├── js/
│   └── script.js          # JavaScript functionality
├── images/                # Image assets (placeholder)
└── .github/
    └── copilot-instructions.md
```

## Getting Started

1. Open `index.html` in a web browser
2. Navigate through the different pages using the main navigation
3. Test responsive design by resizing the browser window
4. Try the filtering functionality on the inventory page
5. Submit the contact form to see validation in action

## 🚀 Running the Application

This is a complete full-stack car dealership website with Node.js backend and dynamic frontend.

### ⚡ Quick Start (Easiest Method)

**Option 1: Use the startup script**
```bash
# Double-click START-SERVER.bat in Windows Explorer
# OR run from PowerShell:
.\START-SERVER.bat
```

**Option 2: Manual start**
```powershell
cd server
npm install    # First time only
npm run seed   # First time only - creates sample vehicles
npm start      # or: node server.js
```

### 🌐 Access the Site

Once the server is running, open these pages:
- **Home**: http://localhost:3000
- **Inventory** (with 6 vehicles): http://localhost:3000/inventory.html  
- **Admin Panel**: http://localhost:3000/admin.html (password: `admin123`)
- **Contact Form**: http://localhost:3000/contact.html

### 🔑 Admin Credentials

- **Password**: `admin123`
- **Header for API**: `x-admin-pass: admin123`

### 📡 API Endpoints

**Public Endpoints:**
```
GET  /api/health              - Server status
GET  /api/vehicles            - List all vehicles
GET  /api/vehicles?make=bmw   - Filter by make
GET  /api/vehicles/:id        - Get single vehicle
POST /api/contact             - Submit contact form
```

**Admin Endpoints (require `x-admin-pass` header):**
```
POST   /api/vehicles    - Create vehicle
PUT    /api/vehicles/:id - Update vehicle
DELETE /api/vehicles/:id - Delete vehicle
```

### 💻 Testing the API

**Get all vehicles:**
```powershell
Invoke-RestMethod http://localhost:3000/api/vehicles | ConvertTo-Json
```

**Create a vehicle:**
```powershell
$vehicle = @{
  title = "2024 Tesla Model 3"
  make = "tesla"
  model = "Model 3"
  year = 2024
  price = 42999
  mileage = 50
  fuel = "electric"
  transmission = "automatic"
  description = "Brand new electric sedan"
  features = @("Autopilot", "Supercharging")
  images = @("images/car1.jpg")
  featured = $true
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:3000/api/vehicles `
  -Method Post `
  -Headers @{'x-admin-pass'='admin123'; 'Content-Type'='application/json'} `
  -Body $vehicle
```

### ✨ Features

**Backend:**
- ✅ Express.js REST API
- ✅ JSON file-based database (simple & reliable)
- ✅ Admin password protection
- ✅ CORS enabled
- ✅ Contact form handling

**Frontend:**
- ✅ Dynamic inventory from API
- ✅ Real-time filtering & search
- ✅ Responsive design
- ✅ Contact form with validation
- ✅ Loading screen with fallback

**Admin Panel:**
- ✅ Password-protected dashboard
- ✅ Add/Edit/Delete vehicles
- ✅ View all inventory
- ✅ Clean tabbed interface## Customization

### Adding New Vehicles
1. Open `inventory.html`
2. Copy an existing car card structure
3. Update the vehicle information, price, and specifications
4. Add appropriate filtering attributes

### Updating Colors
The main color scheme uses:
- Primary: #3498db (blue)
- Secondary: #2c3e50 (dark blue)
- Success: #27ae60 (green)
- Background: #f8f9fa (light gray)

### Adding New Pages
1. Create new HTML file following the existing structure
2. Update navigation in all existing pages
3. Add corresponding styles in `styles.css`
4. Implement any specific JavaScript functionality

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+

## Performance Features

- Optimized CSS with efficient selectors
- Minimal JavaScript for fast loading
- Compressed animations
- Mobile-optimized layouts

## Future Enhancements

- Image gallery for vehicles
- Advanced search filters
- Online financing calculator
- Virtual tour integration
- Customer portal
- Appointment scheduling system

---

© 2025 NexaDriveMotors. All rights reserved.