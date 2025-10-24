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
        ## Copilot / AI agent instructions — NexaDriveMotors (concise)

        Purpose: give AI coding agents the exact, discoverable facts needed to modify and extend this static website quickly.

        Quick facts
        - Static, multi-page site (no build): `index.html`, `inventory.html`, `about.html`, `contact.html`.
        - Styling: `css/styles.css` (mobile-first, Grid/Flexbox, CSS variables in `:root`).
        - Behavior: `js/script.js` (vanilla ES6 — mobile nav, intersection observer, inventory filtering).
        - Assets: `images/` for vehicle photos; external fonts/icons via Google Fonts and Font Awesome.

        Key patterns & examples (do not invent frameworks)
        - Vehicle cards live in `inventory.html`. Use data attributes for filters. Example:
            <div class="car-card" data-make="toyota" data-price="23000" data-year="2019">…</div>
        - Filtering relies on reading data attributes or text content and toggling `style.display`. Look for filter logic in `js/script.js`.
        - Mobile navigation: toggle class on `.nav-menu` in `js/script.js` — keep markup and ARIA attributes intact.

        Developer workflows (discoverable and repeatable)
        - No build step: open `index.html` in a browser for quick checks.
        - Use a local static server for proper relative-paths (recommended):
            - VS Code Live Server extension, or
            - PowerShell: `python -m http.server 8000` from repo root.
        - Debugging: use browser DevTools console; `js/script.js` contains main entry points.

        Conventions & constraints
        - Keep vanilla JS — do not add frameworks or transpilers unless requested.
        - Follow existing BEM-like class names (`.nav-menu`, `.car-card`, `.car-image`, `.car-info`).
        - Preserve accessibility: include `alt` text on images and keep form labels/ARIA attributes.
        - Contact form is frontend-only (shows success message; no backend integration).

        Files to check first
        - `inventory.html` — vehicle card markup and data-* attributes
        - `js/script.js` — filtering, nav toggle, intersection observer
        - `css/styles.css` — variables in `:root`, breakpoints at ~768px and ~480px
        - `index.html` / `contact.html` — hero image cycling and contact form handling

        Small edits examples
        - Add a new vehicle: copy an existing `.car-card` in `inventory.html`, add the photo to `images/`, set `data-*` attrs and test the filter UI.

        Gotchas
        - Image paths: use `images/<name>` (case-sensitive on hosted servers).
        - Filtering performance: `querySelectorAll` over many nodes is acceptable here; keep logic simple and DOM-access minimal.

        If anything above is unclear or you want a different level of detail (file-by-file notes, test snippets, or example PRs), tell me what to expand.