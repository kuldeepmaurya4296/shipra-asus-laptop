const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const config = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/shipra',
    jwtSecret: process.env.JWT_SECRET || 'dev_secret_key_shipra_2024',
    mockDelay: process.env.MOCK_DELAY || 500, // Simulate network delay

    // Feature flags to toggle between Mock and Real APIs
    useMockMaps: process.env.USE_MOCK_MAPS !== 'false', // Default to true
    useMockAuth: process.env.USE_MOCK_AUTH !== 'false', // Default to true

    // Real API Keys (Load from env, but fail safely if missing)
    // Real API Keys (Load from env, but fail safely if missing)
    googleMapsKey: process.env.GOOGLE_MAPS_KEY || '',
    googleClientId: process.env.GOOGLE_CLIENT_ID || '',
    twilioSid: process.env.TWILIO_SID || '',
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN || '',
    twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
    razorpayKeyId: process.env.RAZORPAY_KEY_ID || '',
    razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET || '',
};

module.exports = config;
