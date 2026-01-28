const Booking = require('../models/Booking');
const User = require('../models/User');
const config = require('../config/env');

const Location = require('../models/Location');
const Bird = require('../models/Bird');

exports.getLocations = async (req, res) => {
    try {
        const locations = await Location.find({});
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching locations' });
    }
};

exports.getAvailableBirds = async (req, res) => {
    try {
        const birds = await Bird.find({ status: 'Ready' }); // Only show ready birds? Or all? Let's show all for demo
        res.json(birds);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching birds' });
    }
};

const Razorpay = require('razorpay');

// Create a new Booking - SAVES TO DB
exports.createBooking = async (req, res) => {
    try {
        const { userId, fromId, toId, cost, distance } = req.body;

        // Fetch names from DB or use ID if name lookup fails (for robustness)
        const fromLocDoc = await Location.findById(fromId);
        const toLocDoc = await Location.findById(toId);

        const fromLoc = fromLocDoc ? fromLocDoc.name : 'Unknown Origin';
        const toLoc = toLocDoc ? toLocDoc.name : 'Unknown Dest';
        const amount = cost || 3000;

        // Razorpay Integration
        let razorpayOrder = null;
        if (config.razorpayKeyId && config.razorpayKeySecret) {
            const instance = new Razorpay({
                key_id: config.razorpayKeyId,
                key_secret: config.razorpayKeySecret,
            });

            razorpayOrder = await instance.orders.create({
                amount: amount * 100, // amount in paise
                currency: "INR",
                receipt: `receipt_${Date.now()}`,
            });
        }

        // Create booking in DB
        const booking = await Booking.create({
            userId: userId,
            fromLocation: fromLoc,
            toLocation: toLoc,
            cost: amount,
            distanceKm: distance || 12,
            status: razorpayOrder ? 'pending_payment' : 'confirmed', // If payment integration active, keep pending
            paymentId: razorpayOrder ? razorpayOrder.id : null
        });

        // Update User Trips count (Optional validation)
        await User.findByIdAndUpdate(userId, { $inc: { trips: 1 } });

        res.json({ success: true, booking, orderId: razorpayOrder ? razorpayOrder.id : null, keyId: config.razorpayKeyId });
    } catch (error) {
        console.error('Create Booking Error:', error);
        res.status(500).json({ success: false, message: 'Booking Failed: ' + error.message });
    }
};

exports.getBookingStatus = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            // Fallback for demo if id is fake
            return res.json({
                status: 'in-progress',
                eta_minutes: 4,
                distance_remaining_km: 1.2,
                current_altitude_m: 250,
                speed_kmh: 95
            });
        }
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching status' });
    }
};

exports.getUserHistory = async (req, res) => {
    try {
        // In a real app, use req.user.id from middleware
        // For now, allow passing userId via query or body for testing
        const userId = req.query.userId;
        if (!userId) {
            // Return mock history if no user login context
            return res.json([
                { id: 'mock1', fromLocation: 'Downtown', toLocation: 'Airport', date: new Date(), cost: 3000, status: 'completed' }
            ]);
        }

        const bookings = await Booking.find({ userId }).sort({ date: -1 });
        // Format for UI
        const history = bookings.map(b => ({
            id: b._id,
            route: `${b.fromLocation} → ${b.toLocation}`,
            date: new Date(b.date).toDateString(),
            cost: `₹${b.cost}`,
            status: b.status
        }));

        res.json(history);
    } catch (error) {
        console.error('History Error:', error);
        res.status(500).json({ message: 'Failed to fetch history' });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.query.userId;
        if (!userId) return res.status(400).json({ message: 'User ID required' });

        const user = await User.findById(userId);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Profile Error' });
    }
};

// Legacy Login (Keep for backward compat or remove)
exports.login = (req, res) => {
    res.status(400).json({ message: 'Use /auth/google or /auth/whatsapp endpoints' });
};
