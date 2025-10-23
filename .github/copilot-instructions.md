# Copilot Instructions for NexaDriveMotors

## Project Overview
NexaDriveMotors is a professional car dealership website built with modern HTML5, CSS3, and JavaScript. It features a responsive design, interactive elements, and a complete multi-page structure for showcasing vehicles and dealership services.

## Technology Stack
- **Frontend**: HTML5, CSS3 (Grid/Flexbox), JavaScript (ES6+)
- **Styling**: Custom CSS with Google Fonts (Inter), Font Awesome icons
- **Structure**: Multi-page static website (index, inventory, about, contact)
- **Assets**: Images stored in `/images/` directory

## Architecture & File Structure
```
nexadrivemotors/
├── index.html              # Homepage with hero, features, featured cars
├── inventory.html          # Vehicle inventory with filtering/search
├── about.html             # Company info, team, testimonials
├── contact.html           # Contact form, business info, FAQ
├── css/styles.css         # Main stylesheet (1000+ lines)
├── js/script.js           # Interactive functionality
├── images/                # Vehicle and team photos
└── README.md              # Project documentation
```

## Key Development Patterns

### CSS Architecture
- **Mobile-first responsive design** with breakpoints at 768px and 480px
- **CSS Grid & Flexbox** for layouts (no CSS frameworks)
- **CSS Custom properties** for consistent theming:
  - Primary: `#3498db` (blue), Secondary: `#2c3e50` (dark blue)
  - Background: `#f8f9fa`, Success: `#27ae60`
- **Component-based styling**: `.btn`, `.card`, `.feature-card`, etc.

### JavaScript Functionality
- **Mobile navigation** toggle with hamburger menu
- **Scroll-based animations** using Intersection Observer API
- **Form validation** with custom success/error messaging
- **Dynamic filtering** for vehicle inventory (make, price, year)
- **Image cycling** in hero section (5-second intervals)

### HTML Structure Conventions
- **Semantic HTML5** with proper heading hierarchy
- **Consistent navigation** across all pages with active states
- **Accessibility features**: proper alt text, form labels, ARIA attributes
- **Meta tags** for viewport and SEO optimization

## Critical Implementation Details

### Vehicle Cards Structure
```html
<div class="car-card">
    <div class="car-image">
        <img src="images/car1.jpg" alt="Vehicle Name">
        <div class="car-price">$XX,XXX</div>
        <div class="car-badge">Featured</div> <!-- Optional -->
    </div>
    <div class="car-info">
        <h3>Year Make Model</h3>
        <p class="car-specs"><!-- Mileage, fuel, transmission --></p>
        <div class="car-features"><!-- Feature tags --></div>
        <div class="car-actions"><!-- Action buttons --></div>
    </div>
</div>
```

### Filter System Implementation
- **Data attributes** or text content parsing for filtering
- **Event listeners** on all filter inputs for real-time updates
- **Display toggling** using `style.display` property
- **Clear filters** functionality resets all inputs and shows all items

### Form Handling Pattern
```javascript
// Contact form with validation and feedback
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Validation logic
    // showMessage() for user feedback
    // Form reset on success
});
```

## Development Workflows

### Adding New Vehicles
1. Add new car card HTML to `inventory.html`
2. Include proper data attributes for filtering
3. Add corresponding image to `/images/` directory
4. Test filtering functionality works correctly

### Styling New Components
1. Follow existing naming conventions (BEM-like)
2. Use CSS Grid/Flexbox for layouts
3. Include hover states and transitions
4. Add responsive breakpoints for mobile

### Testing Checklist
- **Responsive design** at 320px, 768px, 1024px, 1200px+ widths
- **Mobile navigation** toggle functionality
- **Form validation** for all required fields
- **Filter functionality** with various combinations
- **Cross-browser compatibility** (Chrome, Firefox, Safari, Edge)

## External Dependencies
- **Google Fonts**: Inter font family (300-700 weights)
- **Font Awesome**: v6.0.0 for icons
- **No JavaScript frameworks** - vanilla JS only

## Important Notes
- **Form submissions**: Contact form shows success message but doesn't actually submit
- **Map integration**: Placeholder for Google Maps (not implemented)
- **No backend**: Static website only, no server-side functionality

## Common Customization Tasks
- **Color scheme**: Update CSS custom properties in `:root`
- **Navigation**: Modify `.nav-menu` structure and corresponding JavaScript
- **Content**: Update text content directly in HTML files
- **Animations**: Adjust CSS animations and Intersection Observer thresholds