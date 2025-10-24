const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'vehicles.json');

const sampleVehicles = [
  {
    id: 1,
    title: '2023 BMW X5 xDrive40i',
    make: 'bmw',
    model: 'X5',
    year: 2023,
    price: 45999,
    mileage: 15000,
    fuel: 'gasoline',
    transmission: 'automatic',
    description: 'Luxury SUV with premium features and exceptional performance',
    features: ['AWD', 'Leather', 'Sunroof', 'Navigation', 'Premium Sound'],
    images: ['images/car1.jpg'],
    featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: '2022 Mercedes C-Class C300',
    make: 'mercedes',
    model: 'C300',
    year: 2022,
    price: 38500,
    mileage: 22000,
    fuel: 'gasoline',
    transmission: 'automatic',
    description: 'Elegant sedan with advanced technology',
    features: ['RWD', 'Leather', 'Heated Seats', 'Bluetooth', 'Backup Camera'],
    images: ['images/car2.jpg'],
    featured: false,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    title: '2023 Audi A4 Premium',
    make: 'audi',
    model: 'A4',
    year: 2023,
    price: 32900,
    mileage: 8500,
    fuel: 'gasoline',
    transmission: 'automatic',
    description: 'Sporty sedan with cutting-edge technology',
    features: ['AWD', 'Leather', 'Virtual Cockpit', 'Bang & Olufsen', 'Apple CarPlay'],
    images: ['images/car3.jpg'],
    featured: false,
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    title: '2022 Lexus ES 350 Luxury',
    make: 'lexus',
    model: 'ES 350',
    year: 2022,
    price: 29999,
    mileage: 18500,
    fuel: 'gasoline',
    transmission: 'automatic',
    description: 'Comfortable and reliable luxury sedan',
    features: ['FWD', 'Leather', 'Safety 2.0', 'Mark Levinson', 'Heated/Cooled Seats'],
    images: ['images/car4.jpg'],
    featured: false,
    created_at: new Date().toISOString()
  },
  {
    id: 5,
    title: '2023 Honda Accord Sport',
    make: 'honda',
    model: 'Accord',
    year: 2023,
    price: 24999,
    mileage: 12000,
    fuel: 'gasoline',
    transmission: 'automatic',
    description: 'Reliable and fuel-efficient sedan',
    features: ['FWD', 'Cloth', 'Honda Sensing', 'Apple CarPlay', 'LED Headlights'],
    images: ['images/car5.jpg'],
    featured: false,
    created_at: new Date().toISOString()
  },
  {
    id: 6,
    title: '2022 Toyota Camry XLE',
    make: 'toyota',
    model: 'Camry',
    year: 2022,
    price: 26500,
    mileage: 19500,
    fuel: 'gasoline',
    transmission: 'automatic',
    description: 'Popular midsize sedan with excellent value',
    features: ['FWD', 'Leather', 'Safety Sense 2.5', 'JBL Audio', 'Wireless Charging'],
    images: ['images/car6.jpg'],
    featured: false,
    created_at: new Date().toISOString()
  }
];

const data = {
  vehicles: sampleVehicles,
  nextId: 7
};

fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

console.log('✅ Database seeded successfully!');
console.log(`📊 Created ${sampleVehicles.length} vehicles`);
console.log(`📁 File: ${DB_FILE}`);
console.log('\nVehicles:');
sampleVehicles.forEach(v => {
  console.log(`  ${v.id}. ${v.title} - $${v.price.toLocaleString()}`);
});
