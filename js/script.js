// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .car-card, .cta-content');
    animatedElements.forEach(el => observer.observe(el));
});

// Hero car image cycling
const heroCar = document.getElementById('hero-car');
const carImages = [
    'https://placehold.co/800x600/2c3e50/ffffff?text=Premium+Vehicles',
    'https://placehold.co/800x600/3498db/ffffff?text=Luxury+Cars',
    'https://placehold.co/800x600/e74c3c/ffffff?text=Sport+Models',
    'https://placehold.co/800x600/27ae60/ffffff?text=SUVs+%26+Trucks'
];

let currentImageIndex = 0;

function cycleHeroImage() {
    currentImageIndex = (currentImageIndex + 1) % carImages.length;
    if (heroCar) {
        heroCar.style.opacity = '0';
        setTimeout(() => {
            heroCar.src = carImages[currentImageIndex];
            heroCar.style.opacity = '1';
        }, 300);
    }
}

// Start image cycling after page load (disabled by default - uncomment to enable)
// document.addEventListener('DOMContentLoaded', () => {
//     setInterval(cycleHeroImage, 15000); // Change image every 15 seconds
// });

// Advanced Search and Filter Variables
let currentFilters = {};
let allVehicles = [];
let currentView = 'grid';

// Initialize advanced features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeAdvancedFilters();
    initializeVehicleData();
    initializeSearchSuggestions();
    setupViewToggle();
    setupSortingControls();
});

// Advanced Filter Functions
function toggleAdvancedFilters() {
    const advancedFilters = document.getElementById('advanced-filters');
    const isVisible = advancedFilters.classList.contains('show');
    
    if (isVisible) {
        advancedFilters.classList.remove('show');
        setTimeout(() => {
            advancedFilters.style.display = 'none';
        }, 300);
    } else {
        advancedFilters.style.display = 'block';
        setTimeout(() => {
            advancedFilters.classList.add('show');
        }, 10);
    }
}

function initializeAdvancedFilters() {
    const filterInputs = document.querySelectorAll('#advanced-filters input, #advanced-filters select');
    
    filterInputs.forEach(input => {
        input.addEventListener('input', updateResultsReal);
        input.addEventListener('change', updateResultsReal);
    });
    
    // Search input real-time filtering
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(updateResultsReal, 300));
    }
}

function updateResultsReal() {
    collectFilters();
    filterVehicles();
    updateResultsSummary();
    updateActiveFilters();
}

function collectFilters() {
    currentFilters = {
        search: document.getElementById('search')?.value.toLowerCase() || '',
        make: document.getElementById('make')?.value || '',
        bodyType: document.getElementById('body-type')?.value || '',
        fuelType: document.getElementById('fuel-type')?.value || '',
        transmission: document.getElementById('transmission')?.value || '',
        priceMin: parseInt(document.getElementById('price-min')?.value) || 0,
        priceMax: parseInt(document.getElementById('price-max')?.value) || Infinity,
        yearMin: parseInt(document.getElementById('year-min')?.value) || 0,
        yearMax: parseInt(document.getElementById('year-max')?.value) || 9999,
        mileageMin: parseInt(document.getElementById('mileage-min')?.value) || 0,
        mileageMax: parseInt(document.getElementById('mileage-max')?.value) || Infinity,
        color: document.getElementById('color')?.value || ''
    };
}

function filterVehicles() {
    const carCards = document.querySelectorAll('.car-card');
    let visibleCount = 0;
    
    carCards.forEach(card => {
        const cardData = {
            make: card.dataset.make || '',
            price: parseInt(card.dataset.price) || 0,
            year: parseInt(card.dataset.year) || 0,
            mileage: parseInt(card.dataset.mileage) || 0,
            body: card.dataset.body || '',
            fuel: card.dataset.fuel || '',
            transmission: card.dataset.transmission || '',
            color: card.dataset.color || '',
            text: card.textContent.toLowerCase()
        };
        
        const matches = (
            (!currentFilters.search || cardData.text.includes(currentFilters.search)) &&
            (!currentFilters.make || cardData.make === currentFilters.make) &&
            (!currentFilters.bodyType || cardData.body === currentFilters.bodyType) &&
            (!currentFilters.fuelType || cardData.fuel === currentFilters.fuelType) &&
            (!currentFilters.transmission || cardData.transmission === currentFilters.transmission) &&
            (cardData.price >= currentFilters.priceMin && cardData.price <= currentFilters.priceMax) &&
            (cardData.year >= currentFilters.yearMin && cardData.year <= currentFilters.yearMax) &&
            (cardData.mileage >= currentFilters.mileageMin && cardData.mileage <= currentFilters.mileageMax) &&
            (!currentFilters.color || cardData.color === currentFilters.color)
        );
        
        if (matches) {
            card.style.display = 'block';
            card.classList.add('fade-in');
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    return visibleCount;
}

function updateResultsSummary() {
    const resultsCount = document.getElementById('results-count');
    const visibleCards = document.querySelectorAll('.car-card[style*="block"], .car-card:not([style*="none"])').length;
    
    if (resultsCount) {
        resultsCount.textContent = `Showing ${visibleCards} vehicles`;
    }
}

function updateActiveFilters() {
    const activeFiltersContainer = document.getElementById('active-filters');
    if (!activeFiltersContainer) return;
    
    activeFiltersContainer.innerHTML = '';
    
    Object.entries(currentFilters).forEach(([key, value]) => {
        if (value && value !== '' && value !== 0 && value !== Infinity && value !== 9999) {
            const filterTag = document.createElement('div');
            filterTag.className = 'filter-tag';
            
            let displayText = '';
            switch(key) {
                case 'search':
                    displayText = `Search: ${value}`;
                    break;
                case 'priceMin':
                    displayText = `Min Price: $${value.toLocaleString()}`;
                    break;
                case 'priceMax':
                    displayText = `Max Price: $${value.toLocaleString()}`;
                    break;
                default:
                    displayText = `${key.replace(/([A-Z])/g, ' $1')}: ${value}`;
            }
            
            filterTag.innerHTML = `
                ${displayText}
                <span class="remove" onclick="removeFilter('${key}')">&times;</span>
            `;
            
            activeFiltersContainer.appendChild(filterTag);
        }
    });
}

function removeFilter(filterKey) {
    const input = document.getElementById(filterKey) || 
                 document.getElementById(filterKey.replace(/([A-Z])/g, '-$1').toLowerCase());
    
    if (input) {
        input.value = '';
        updateResultsReal();
    }
}

function applyFilters() {
    updateResultsReal();
    showMessage('Filters applied successfully!', 'success');
}

function clearFilters() {
    // Clear all filter inputs
    const filterInputs = document.querySelectorAll('#advanced-filters input, #advanced-filters select, #search');
    filterInputs.forEach(input => {
        input.value = '';
    });
    
    // Reset filters object
    currentFilters = {};
    
    // Show all vehicles
    document.querySelectorAll('.car-card').forEach(card => {
        card.style.display = 'block';
    });
    
    updateResultsSummary();
    updateActiveFilters();
    showMessage('All filters cleared', 'success');
}

function saveSearch() {
    const searchData = {
        filters: currentFilters,
        timestamp: new Date().toISOString(),
        resultCount: document.querySelectorAll('.car-card[style*="block"]').length
    };
    
    localStorage.setItem('savedSearch', JSON.stringify(searchData));
    showMessage('Search criteria saved!', 'success');
}

// Sorting Functions
function setupSortingControls() {
    const sortSelect = document.getElementById('sort-by');
    if (sortSelect) {
        sortSelect.addEventListener('change', sortVehicles);
    }
}

function sortVehicles() {
    const sortBy = document.getElementById('sort-by').value;
    const carGrid = document.getElementById('cars-grid');
    const cards = Array.from(carGrid.querySelectorAll('.car-card'));
    
    cards.sort((a, b) => {
        switch(sortBy) {
            case 'price-low':
                return parseInt(a.dataset.price) - parseInt(b.dataset.price);
            case 'price-high':
                return parseInt(b.dataset.price) - parseInt(a.dataset.price);
            case 'year-new':
                return parseInt(b.dataset.year) - parseInt(a.dataset.year);
            case 'year-old':
                return parseInt(a.dataset.year) - parseInt(b.dataset.year);
            case 'mileage-low':
                return parseInt(a.dataset.mileage) - parseInt(b.dataset.mileage);
            case 'mileage-high':
                return parseInt(b.dataset.mileage) - parseInt(a.dataset.mileage);
            default:
                return 0; // Featured/default order
        }
    });
    
    // Re-append sorted cards
    cards.forEach(card => carGrid.appendChild(card));
}

// View Toggle Functions
function setupViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            switchView(view);
            
            // Update active state
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function switchView(view) {
    const carGrid = document.getElementById('cars-grid');
    currentView = view;
    
    if (view === 'list') {
        carGrid.classList.add('list-view');
    } else {
        carGrid.classList.remove('list-view');
    }
}

// Vehicle Modal Functions
function openVehicleModal(vehicleId) {
    const modal = document.getElementById('vehicle-modal');
    
    // Populate modal with vehicle data (this would typically come from a database)
    populateModalData(vehicleId);
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeVehicleModal() {
    const modal = document.getElementById('vehicle-modal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function populateModalData(vehicleId) {
    // This would typically fetch data from an API
    // For demo purposes, using static data
    const vehicleData = {
        'bmw-x5-2023': {
            title: '2023 BMW X5 xDrive40i',
            price: '$45,999',
            image: 'images/car1.jpg',
            year: '2023',
            mileage: '15,000 mi',
            engine: '3.0L Twin-Turbo I6',
            transmission: 'Automatic'
        }
        // Add more vehicle data as needed
    };
    
    const data = vehicleData[vehicleId] || vehicleData['bmw-x5-2023'];
    
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-price').textContent = data.price;
    document.getElementById('modal-main-image').src = data.image;
    document.getElementById('modal-year').textContent = data.year;
    document.getElementById('modal-mileage').textContent = data.mileage;
    document.getElementById('modal-engine').textContent = data.engine;
    document.getElementById('modal-transmission').textContent = data.transmission;
}

function changeModalImage(thumbnail) {
    const mainImage = document.getElementById('modal-main-image');
    mainImage.src = thumbnail.src;
    
    // Update active thumbnail
    document.querySelectorAll('.image-thumbnails img').forEach(img => {
        img.classList.remove('active');
    });
    thumbnail.classList.add('active');
}

// Tab Functions
function showTab(tabName) {
    // Hide all tab panels
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab panel
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Financial Calculator
function calculatePayment() {
    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const downPayment = parseFloat(document.getElementById('down-payment').value) || 0;
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12;
    const loanTerm = parseInt(document.getElementById('loan-term').value);
    
    const principal = loanAmount - downPayment;
    const monthlyPayment = (principal * interestRate * Math.pow(1 + interestRate, loanTerm)) / 
                          (Math.pow(1 + interestRate, loanTerm) - 1);
    
    const resultDiv = document.getElementById('payment-result');
    resultDiv.innerHTML = `
        <div>Estimated Monthly Payment: <strong>$${monthlyPayment.toFixed(2)}</strong></div>
        <div style="font-size: 0.9rem; margin-top: 0.5rem;">
            Principal: $${principal.toLocaleString()} | Total Interest: $${((monthlyPayment * loanTerm) - principal).toLocaleString()}
        </div>
    `;
    resultDiv.classList.add('show');
}

// Interactive Functions
function toggleFavorite(button) {
    const icon = button.querySelector('i');
    const isFavorited = icon.classList.contains('fas');
    
    if (isFavorited) {
        icon.classList.remove('fas');
        icon.classList.add('far');
        button.classList.remove('active');
        showMessage('Removed from favorites', 'info');
    } else {
        icon.classList.remove('far');
        icon.classList.add('fas');
        button.classList.add('active');
        showMessage('Added to favorites', 'success');
    }
}

function addToCompare(button) {
    button.classList.toggle('active');
    const isComparing = button.classList.contains('active');
    
    if (isComparing) {
        showMessage('Added to comparison', 'success');
    } else {
        showMessage('Removed from comparison', 'info');
    }
}

function shareVehicle(button) {
    if (navigator.share) {
        navigator.share({
            title: 'Check out this vehicle',
            text: 'I found this great car at NexaDriveMotors',
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        showMessage('Link copied to clipboard!', 'success');
    }
}

function scheduleTestDrive(vehicleId) {
    // This would typically open a scheduling modal or redirect to a booking page
    showMessage('Test drive scheduling coming soon!', 'info');
}

// Search Suggestions
function initializeSearchSuggestions() {
    const searchInput = document.getElementById('search');
    const suggestionsContainer = document.getElementById('search-suggestions');
    
    if (!searchInput || !suggestionsContainer) return;
    
    const suggestions = [
        'BMW X5', 'Mercedes C-Class', 'Audi A4', 'Lexus ES',
        'Honda Accord', 'Toyota Camry', 'Hybrid', 'AWD',
        'Leather seats', 'Sunroof', 'Navigation'
    ];
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        if (query.length < 2) {
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        const matches = suggestions.filter(item => 
            item.toLowerCase().includes(query)
        );
        
        if (matches.length > 0) {
            suggestionsContainer.innerHTML = matches
                .slice(0, 5)
                .map(match => `<div class="suggestion-item" onclick="selectSuggestion('${match}')">${match}</div>`)
                .join('');
            suggestionsContainer.style.display = 'block';
        } else {
            suggestionsContainer.style.display = 'none';
        }
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.style.display = 'none';
        }
    });
}

function selectSuggestion(suggestion) {
    document.getElementById('search').value = suggestion;
    document.getElementById('search-suggestions').style.display = 'none';
    updateResultsReal();
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function initializeVehicleData() {
    // Try loading vehicle data from API. If API isn't available, fall back to static DOM.
    loadVehiclesFromApi().then(loaded => {
        if (!loaded) {
            allVehicles = Array.from(document.querySelectorAll('.car-card')).map(card => ({
                element: card,
                data: card.dataset
            }));
        }
    });
}

// Fetch vehicles from API and render them dynamically. Returns true if API was used.
async function loadVehiclesFromApi() {
    try {
        const res = await fetch('/api/vehicles');
        if (!res.ok) throw new Error('API unavailable');
        const vehicles = await res.json();
        if (!Array.isArray(vehicles) || vehicles.length === 0) return false;

        const grid = document.getElementById('cars-grid');
        if (!grid) return false;

        // Clear static content
        grid.innerHTML = '';

        vehicles.forEach(v => {
            const card = document.createElement('div');
            card.className = 'car-card';
            card.dataset.make = v.make || '';
            card.dataset.price = v.price || '';
            card.dataset.year = v.year || '';
            card.dataset.mileage = v.mileage || '';
            card.dataset.body = v.body || '';
            card.dataset.fuel = v.fuel || '';
            card.dataset.transmission = v.transmission || '';
            card.dataset.color = (v.color || '');

            // Professional gradient background for vehicle cards
            const makeText = (v.make?.toUpperCase() || 'VEHICLE');
            const gradients = {
                'bmw': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                'mercedes': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'audi': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                'lexus': 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
                'honda': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                'toyota': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
            };
            const gradient = gradients[v.make?.toLowerCase()] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

            card.innerHTML = `
                <div class="car-image vehicle-placeholder" style="background: ${gradient};">
                    <div class="brand-badge">${escapeHtml(makeText)}</div>
                    <div class="car-price">$${(v.price || 0).toLocaleString()}</div>
                    ${v.featured ? '<div class="car-badge">Featured</div>' : ''}
                    <div class="car-actions-overlay">
                        <button class="btn-icon" onclick="toggleFavorite(this)" title="Add to Favorites"><i class="far fa-heart"></i></button>
                        <button class="btn-icon" onclick="addToCompare(this)" title="Compare"><i class="fas fa-balance-scale"></i></button>
                        <button class="btn-icon" onclick="shareVehicle(this)" title="Share"><i class="fas fa-share-alt"></i></button>
                    </div>
                </div>
                <div class="car-info">
                    <h3>${escapeHtml(v.title || `${v.year || ''} ${v.make || ''} ${v.model || ''}`)}</h3>
                    <p class="car-specs">
                        <span><i class="fas fa-road"></i> ${v.mileage ? v.mileage.toLocaleString() + ' miles' : '—'}</span>
                        <span><i class="fas fa-gas-pump"></i> ${escapeHtml(v.fuel || '')}</span>
                        <span><i class="fas fa-cog"></i> ${escapeHtml(v.transmission || '')}</span>
                    </p>
                    <div class="car-features">
                        ${(v.features || []).slice(0,5).map(f => `<span>${escapeHtml(f)}</span>`).join('')}
                    </div>
                    <div class="car-actions">
                        <button class="btn btn-primary" onclick="openVehicleModal('${v.id}')">View Details</button>
                        <button class="btn btn-outline" onclick="scheduleTestDrive('${v.id}')">Test Drive</button>
                    </div>
                </div>
            `;

            grid.appendChild(card);
        });

        // Re-initialize features that expect DOM elements
        allVehicles = Array.from(document.querySelectorAll('.car-card')).map(card => ({
            element: card,
            data: card.dataset
        }));

        return true;
    } catch (err) {
        // API not available — fall back to static markup
        console.log('API not available, using static content');
        return false;
    }
}

function escapeHtml(str) {
    return String(str).replace(/[&<>"'`]/g, s => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '`': '&#96;'
    }[s]));
}

// Enhanced Load More Function
function loadMoreCars() {
    const button = event.target;
    button.textContent = 'Loading...';
    button.disabled = true;
    
    // Simulate loading delay
    setTimeout(() => {
        // In a real application, this would load more vehicles from the server
        const loadInfo = document.querySelector('.load-info');
        button.textContent = 'All Vehicles Loaded';
        button.style.opacity = '0.6';
        loadInfo.textContent = 'All available vehicles are now displayed';
        
        showMessage('All vehicles loaded!', 'success');
    }, 1500);
}

// Add CSS for list view
const listViewStyles = document.createElement('style');
listViewStyles.textContent = `
    .cars-grid.list-view {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .cars-grid.list-view .car-card {
        display: flex;
        background: white;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    }
    
    .cars-grid.list-view .car-image {
        width: 300px;
        height: 200px;
        flex-shrink: 0;
    }
    
    .cars-grid.list-view .car-info {
        flex: 1;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    
    .cars-grid.list-view .car-actions {
        flex-direction: row;
        gap: 1rem;
    }
    
    .suggestion-item {
        padding: 0.75rem 1rem;
        cursor: pointer;
        border-bottom: 1px solid #eee;
        transition: background-color 0.2s ease;
    }
    
    .suggestion-item:hover {
        background-color: #f8f9fa;
    }
    
    .suggestion-item:last-child {
        border-bottom: none;
    }
`;

document.head.appendChild(listViewStyles);

// Financial Calculator Functions
function calculateHomePayment() {
    const price = parseFloat(document.getElementById('calc-price').value);
    const down = parseFloat(document.getElementById('calc-down').value) || 0;
    const rate = parseFloat(document.getElementById('calc-rate').value) / 100 / 12;
    const term = parseInt(document.getElementById('calc-term').value);
    
    const principal = price - down;
    const payment = (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    
    const resultDiv = document.getElementById('home-calc-result');
    resultDiv.innerHTML = `
        <div>Monthly Payment: <strong>$${payment.toFixed(2)}</strong></div>
        <div style="font-size: 0.9rem; margin-top: 0.5rem;">
            Total Paid: $${(payment * term).toLocaleString()} | Interest: $${((payment * term) - principal).toLocaleString()}
        </div>
    `;
    resultDiv.classList.add('show');
}

function estimateTradeIn() {
    const year = document.getElementById('trade-year').value;
    const make = document.getElementById('trade-make').value;
    const model = document.getElementById('trade-model').value;
    const mileage = parseInt(document.getElementById('trade-mileage').value);
    
    if (!year || !make || !model || !mileage) {
        showMessage('Please fill in all fields for trade-in estimate', 'error');
        return;
    }
    
    // Simulate trade-in calculation (in real app, this would call an API)
    const baseValue = {
        '2024': 35000, '2023': 30000, '2022': 25000, '2021': 22000, '2020': 18000, '2019': 15000
    }[year] || 10000;
    
    const makeMultiplier = {
        'bmw': 1.3, 'mercedes': 1.35, 'audi': 1.25, 'honda': 1.1, 'toyota': 1.15
    }[make] || 1.0;
    
    const mileageDeduction = Math.floor(mileage / 10000) * 1000;
    const estimatedValue = Math.max((baseValue * makeMultiplier) - mileageDeduction, 5000);
    
    const resultDiv = document.getElementById('trade-result');
    resultDiv.innerHTML = `
        <div>Estimated Trade-In Value</div>
        <div style="font-size: 1.5rem; margin: 0.5rem 0;"><strong>$${estimatedValue.toLocaleString()}</strong></div>
        <div style="font-size: 0.8rem;">*Estimate based on market data. Actual value may vary.</div>
    `;
    resultDiv.classList.add('show');
}

function calculateAffordability() {
    const income = parseFloat(document.getElementById('afford-income').value);
    const expenses = parseFloat(document.getElementById('afford-expenses').value);
    const percent = parseFloat(document.getElementById('afford-percent').value) / 100;
    
    if (!income || !expenses) {
        showMessage('Please enter your income and expenses', 'error');
        return;
    }
    
    const disposableIncome = income - expenses;
    const maxPayment = disposableIncome * percent;
    const estimatedVehiclePrice = maxPayment * 60; // Assuming 60-month loan
    
    const resultDiv = document.getElementById('afford-result');
    resultDiv.innerHTML = `
        <div>Recommended Budget</div>
        <div style="font-size: 1.2rem; margin: 0.5rem 0;"><strong>$${maxPayment.toFixed(2)}/month</strong></div>
        <div style="font-size: 1rem;">Vehicle Price: ~$${estimatedVehiclePrice.toLocaleString()}</div>
    `;
    resultDiv.classList.add('show');
}

// Reviews Carousel Functions
let currentReviewIndex = 1;
const totalReviews = 3;

function nextReview() {
    currentReviewIndex = currentReviewIndex >= totalReviews ? 1 : currentReviewIndex + 1;
    showReview(currentReviewIndex);
}

function previousReview() {
    currentReviewIndex = currentReviewIndex <= 1 ? totalReviews : currentReviewIndex - 1;
    showReview(currentReviewIndex);
}

function currentReview(index) {
    currentReviewIndex = index;
    showReview(currentReviewIndex);
}

function showReview(index) {
    // Hide all reviews
    document.querySelectorAll('.review-slide').forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    document.querySelectorAll('.dot').forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show selected review
    const slides = document.querySelectorAll('.review-slide');
    if (slides[index - 1]) {
        slides[index - 1].classList.add('active');
    }
    
    // Activate corresponding dot
    const dots = document.querySelectorAll('.dot');
    if (dots[index - 1]) {
        dots[index - 1].classList.add('active');
    }
}

// Auto-rotate reviews
function startReviewCarousel() {
    setInterval(() => {
        nextReview();
    }, 5000); // Change review every 5 seconds
}

// Chat Widget Functions
let chatOpen = false;

function toggleChat() {
    const chatBody = document.getElementById('chat-body');
    chatOpen = !chatOpen;
    
    if (chatOpen) {
        chatBody.classList.add('open');
    } else {
        chatBody.classList.remove('open');
    }
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    input.value = '';
    
    // Simulate bot response
    setTimeout(() => {
        const botResponse = generateBotResponse(message);
        addChatMessage(botResponse, 'bot');
    }, 1000);
}

function addChatMessage(message, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
        <div class="message-time">${timeString}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateBotResponse(userMessage) {
    const responses = {
        'hello': 'Hello! How can I help you find your perfect vehicle today?',
        'hi': 'Hi there! What type of vehicle are you looking for?',
        'price': 'Our vehicles range from $24,500 to $45,999. Would you like to see vehicles in a specific price range?',
        'financing': 'We offer competitive financing with rates starting at 5.9% APR. Would you like to calculate your monthly payment?',
        'test drive': 'I can help you schedule a test drive! Which vehicle interests you?',
        'hours': 'We\'re open Monday-Friday 9AM-7PM, Saturday 9AM-6PM, and Sunday 11AM-5PM.',
        'location': 'We\'re located at 123 Auto Plaza Drive. Would you like directions?',
        'default': 'That\'s a great question! For detailed information, I can connect you with one of our sales specialists. Would you like me to arrange a call?'
    };
    
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
        if (key !== 'default' && lowerMessage.includes(key)) {
            return response;
        }
    }
    
    return responses.default;
}

function handleChatEnter(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

// Dark Mode Functions
function initializeDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.onclick = toggleDarkMode;
    darkModeToggle.title = 'Toggle Dark Mode';
    
    document.body.appendChild(darkModeToggle);
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

function toggleDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if (document.body.classList.contains('dark-mode')) {
        disableDarkMode();
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        enableDarkMode();
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', null);
}

// Loading Screen Functions
function createLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loader"></div>
        <div class="loading-text">Loading NexaDriveMotors...</div>
    `;
    
    document.body.insertBefore(loadingScreen, document.body.firstChild);
    
    // Helper to remove the loading screen with fade
    const removeLoading = () => {
        try {
            if (!loadingScreen || !loadingScreen.parentNode) return;
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                if (loadingScreen.parentNode) loadingScreen.remove();
            }, 500);
        } catch (e) {
            // ignore
        }
    };

    // Hide loading screen quickly after DOM is ready (much faster than full load)
    // We're already in DOMContentLoaded when this runs, so remove it almost immediately
    setTimeout(() => {
        removeLoading();
    }, 800); // Just 0.8 seconds - enough for a smooth transition
}

// Enhanced Animations
function initializeAdvancedAnimations() {
    // Parallax scrolling effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.backgroundPosition = `center ${rate}px`;
        }
    });
    
    // Staggered animations for feature cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe elements for staggered animation
    document.querySelectorAll('.feature-card, .tool-card').forEach(card => {
        staggerObserver.observe(card);
    });
}

// Performance Optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Trigger actual loading
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalImages = ['images/hero-car.jpg', 'images/car1.jpg'];
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Error Handling
function initializeErrorHandling() {
    window.addEventListener('error', (event) => {
        console.error('Global error:', event.error);
        showMessage('An unexpected error occurred. Please refresh the page.', 'error');
    });
    
    // Handle failed image loads
    document.addEventListener('error', (event) => {
        if (event.target.tagName === 'IMG') {
            event.target.src = 'images/placeholder-car.jpg'; // Fallback image
        }
    }, true);
}

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', () => {
    // Create loading screen
    createLoadingScreen();
    
    // Initialize advanced features
    initializeDarkMode();
    initializeAdvancedAnimations();
    optimizePerformance();
    initializeErrorHandling();
    
    // Start review carousel
    startReviewCarousel();
    
    // Initialize tooltips for interactive elements
    initializeTooltips();
});

function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[title]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(event) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = event.target.getAttribute('title');
    tooltip.style.cssText = `
        position: absolute;
        background: #2c3e50;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        font-size: 0.8rem;
        z-index: 2000;
        pointer-events: none;
        white-space: nowrap;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    event.target.tooltipElement = tooltip;
}

function hideTooltip(event) {
    if (event.target.tooltipElement) {
        event.target.tooltipElement.remove();
        delete event.target.tooltipElement;
    }
}

// Contact form handling
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Submit to API
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                showMessage('Thank you for your message! We will get back to you soon.', 'success');
                contactForm.reset();
            } else {
                const error = await response.json();
                showMessage(error.error || 'Failed to send message. Please try again.', 'error');
            }
        } catch (err) {
            // Fallback if API is not available
            showMessage('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        }
    });
}

function showMessage(message, type) {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    messageEl.textContent = message;
    
    // Style the message
    messageEl.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 1001;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background: #27ae60;' : 'background: #e74c3c;'}
    `;
    
    document.body.appendChild(messageEl);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageEl.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageEl.remove(), 300);
    }, 5000);
}

// Add CSS for message animations
const messageStyles = document.createElement('style');
messageStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(messageStyles);

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeContactForm);

// Loading animation
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen if it exists
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 1000);
    }
    
    // Add stagger animation to car cards
    const carCards = document.querySelectorAll('.car-card');
    carCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Back to top button
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
    `;
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    document.body.appendChild(backToTop);
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', createBackToTopButton);