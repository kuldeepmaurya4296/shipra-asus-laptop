const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fromLocation: { type: String, required: true },
    toLocation: { type: String, required: true },
    birdId: { type: String, default: 'unknown' },
    status: { type: String, default: 'confirmed' },
    date: { type: Date, default: Date.now },
    cost: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    etaMinutes: { type: Number, default: 15 },
    distanceKm: { type: Number, default: 0 }
});

module.exports = mongoose.model('Booking', bookingSchema);
