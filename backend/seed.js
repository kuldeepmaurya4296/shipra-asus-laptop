const mongoose = require('mongoose');
const config = require('./config/env');
const Location = require('./models/Location');
const Bird = require('./models/Bird');

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoUri);
        console.log('MongoDB Connected for Seeding');
    } catch (error) {
        console.error('DB Connection Failed:', error);
        process.exit(1);
    }
};

const seedData = async () => {
    await connectDB();

    // Clear existing data
    await Location.deleteMany({});
    await Bird.deleteMany({});
    console.log('Cleared existing Locations and Birds');

    // Create Locations (Hubs)
    const locations = [
        { name: 'Bhopal (Raja Bhoj Airport)', lat: 23.2875, lng: 77.3377, available: true, description: 'Central Hub' },
        { name: 'New Delhi (IGI)', lat: 28.5562, lng: 77.1000, available: true, description: 'National Capital' },
        { name: 'Mumbai (CSMIA)', lat: 19.0902, lng: 72.8628, available: true, description: 'Financial Hub' },
        { name: 'Bangalore (KIAL)', lat: 13.1986, lng: 77.7066, available: true, description: 'Tech Hub' },
        { name: 'Indore (Devi Ahilya)', lat: 22.7217, lng: 75.8011, available: true, description: 'Regional Hub' },
        { name: 'Jaipur (JAI)', lat: 26.8289, lng: 75.8056, available: false, description: 'Pink City' }
    ];

    const createdLocations = await Location.insertMany(locations);
    console.log(`Seeded ${createdLocations.length} Locations`);

    // Create Birds
    const birds = [
        { model: 'eVTOL-X1', status: 'Ready', battery: 98, lat: 23.2875, lng: 77.3377 }, // Bhopal
        { model: 'eVTOL-X1', status: 'Charging', battery: 45, lat: 28.5562, lng: 77.1000 },
        { model: 'eVTOL-SkyPro', status: 'Ready', battery: 100, lat: 19.0902, lng: 72.8628 },
        { model: 'Nano-Flyer', status: 'Maintenance', battery: 12, lat: 22.7217, lng: 75.8011 },
        { model: 'eVTOL-X1', status: 'Ready', battery: 88, lat: 13.1986, lng: 77.7066 }
    ];

    const createdBirds = await Bird.insertMany(birds);
    console.log(`Seeded ${createdBirds.length} Birds`);

    // Create Users
    const User = require('./models/User'); // Import User model
    await User.deleteMany({});

    // Create a demo user we can use for testing if auth fails
    const users = [
        { name: 'Kuldeep Maurya', email: 'kuldeep@example.com', phone: '9876543210', googleId: 'demo_google_id_1', role: 'user' },
        { name: 'Shipra Singh', email: 'shipra@example.com', phone: '9988776655', role: 'user' },
        { name: 'Admin User', email: 'admin@shipra.com', phone: '1122334455', role: 'admin' },
        { name: 'Test Traveler', email: 'traveler@test.com', phone: '1231231234', role: 'user' }
    ];

    const createdUsers = await User.insertMany(users);
    console.log(`Seeded ${createdUsers.length} Users`);

    // Create Bookings History
    const Booking = require('./models/Booking'); // Import Booking model
    await Booking.deleteMany({});

    const demoUser = createdUsers[0]; // Attach bookings to the first user
    const bookings = [
        {
            userId: demoUser._id,
            fromLocation: 'Bhopal (Raja Bhoj Airport)',
            toLocation: 'Indore (Devi Ahilya)',
            date: new Date('2024-01-15'),
            cost: 2500,
            status: 'completed',
            distanceKm: 190
        },
        {
            userId: demoUser._id,
            fromLocation: 'New Delhi (IGI)',
            toLocation: 'Jaipur (JAI)',
            date: new Date('2024-01-20'),
            cost: 4200,
            status: 'cancelled',
            distanceKm: 260
        },
        {
            userId: demoUser._id,
            fromLocation: 'Mumbai (CSMIA)',
            toLocation: 'Pune (Lohegaon)',
            date: new Date('2024-02-01'),
            cost: 3000,
            status: 'completed',
            distanceKm: 150
        },
        {
            userId: demoUser._id,
            fromLocation: 'Bangalore (KIAL)',
            toLocation: 'Mysore (MYQ)',
            date: new Date('2024-02-10'),
            cost: 1800,
            status: 'confirmed',
            distanceKm: 140
        }
    ];

    const createdBookings = await Booking.insertMany(bookings);
    console.log(`Seeded ${createdBookings.length} Bookings`);

    process.exit();
};

seedData();
