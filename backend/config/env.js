require('dotenv').config();

const config = {
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || 'dev_secret_key_shipra_2024',
    mockDelay: process.env.MOCK_DELAY || 500, // Simulate network delay

    // Feature flags to toggle between Mock and Real APIs
    useMockMaps: process.env.USE_MOCK_MAPS !== 'false', // Default to true
    useMockAuth: process.env.USE_MOCK_AUTH !== 'false', // Default to true

    // Real API Keys (Load from env, but fail safely if missing)
    googleMapsKey: process.env.GOOGLE_MAPS_KEY || '',
    twilioSid: process.env.TWILIO_SID || '',
};

module.exports = config;
