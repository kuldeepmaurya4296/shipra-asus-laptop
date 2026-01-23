const config = require('../config/env');

const mockData = {
    locations: [
        { id: '1', name: 'Downtown Airport', lat: 28.6139, lng: 77.2090, available: true },
        { id: '2', name: 'City Center Terminal', lat: 28.5562, lng: 77.1000, available: true },
        { id: '3', name: 'Tech Park Hub', lat: 28.4595, lng: 77.0266, available: true },
        { id: '4', name: 'Riverside Port', lat: 28.5828, lng: 77.2344, available: false },
    ],
    birds: [
        { id: 'B42', model: 'eVTOL-X1', status: 'Ready', battery: 98, lat: 28.6145, lng: 77.2095 },
        { id: 'B18', model: 'eVTOL-X1', status: 'Charging', battery: 45, lat: 28.5565, lng: 77.1005 },
        { id: 'B99', model: 'eVTOL-Pro', status: 'Maintenance', battery: 10, lat: 28.4590, lng: 77.0260 },
    ],
    bookings: [], // In-memory storage for bookings
    user: {
        id: 'u1',
        name: 'Kuldeep Maurya',
        email: 'kuldeep.maurya@example.com',
        rating: 4.8,
        trips: 12,
        status: 'Gold',
    }
};

// --- Controllers ---

exports.login = (req, res) => {
    // Mock Login - in real app, verify OTP/Token
    const { phone, email } = req.body;

    setTimeout(() => {
        res.json({
            success: true,
            token: 'mock-jwt-token-xyz-123',
            user: mockData.user
        });
    }, config.mockDelay);
};

exports.getLocations = (req, res) => {
    setTimeout(() => {
        res.json(mockData.locations);
    }, config.mockDelay);
};

exports.getAvailableBirds = (req, res) => {
    const { locationId } = req.query;
    // Simple filter simulation
    const birds = mockData.birds.filter(b => b.status === 'Ready');

    setTimeout(() => {
        res.json(birds);
    }, config.mockDelay);
};

exports.createBooking = (req, res) => {
    const { fromId, toId, birdId } = req.body;

    const booking = {
        id: 'bk_' + Date.now(),
        from: mockData.locations.find(l => l.id === fromId),
        to: mockData.locations.find(l => l.id === toId),
        birdId,
        status: 'confirmed',
        date: new Date().toISOString(),
        cost: '3000',
        currency: 'INR'
    };

    mockData.bookings.push(booking);

    setTimeout(() => {
        res.json({ success: true, booking });
    }, config.mockDelay);
};

exports.getBookingStatus = (req, res) => {
    const { bookingId } = req.params;
    // Simulate finding booking
    const booking = mockData.bookings.find(b => b.id === bookingId) || {
        id: bookingId,
        status: 'in-progress',
        eta_minutes: 4,
        distance_remaining_km: 1.2,
        current_altitude_m: 250,
        speed_kmh: 95
    };

    setTimeout(() => {
        res.json(booking);
    }, config.mockDelay);
};

exports.getUserHistory = (req, res) => {
    const history = [
        { id: '1', route: 'Downtown → Airport', date: 'Jan 20, 2024', cost: '₹3,000', status: 'completed' },
        { id: '2', route: 'Airport → Garden', date: 'Jan 18, 2024', cost: '₹2,500', status: 'completed' },
        { id: '3', route: 'Hotel → Downtown', date: 'Jan 16, 2024', cost: '₹3,500', status: 'completed' }
    ];

    setTimeout(() => {
        res.json(history);
    }, config.mockDelay);
};

exports.getUserProfile = (req, res) => {
    setTimeout(() => {
        res.json(mockData.user);
    }, config.mockDelay);
};
