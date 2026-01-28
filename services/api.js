// Basic wrapper for fetch API
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = {
    async get(endpoint) {
        try {
            const response = await fetch(`${API_URL}${endpoint}`);
            return await response.json();
        } catch (error) {
            console.error('API GET Error:', error);
            return null;
        }
    },

    async post(endpoint, body) {
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            return await response.json();
        } catch (error) {
            console.error('API POST Error:', error);
            return null;
        }
    }
};

export const endpoints = {
    login: '/auth/login',
    locations: '/locations',
    birds: '/birds/available',
    createBooking: '/bookings',
    history: '/bookings/history',
    profile: '/user/profile',
};
