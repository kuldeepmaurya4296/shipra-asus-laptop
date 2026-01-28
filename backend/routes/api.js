const express = require('express');
const router = express.Router();
const controller = require('../controllers/apiController');

// Auth
const authController = require('../controllers/authController');

// Auth
router.post('/auth/google', authController.googleLogin);
router.post('/auth/whatsapp/send', authController.sendWhatsappOtp);
router.post('/auth/whatsapp/verify', authController.verifyWhatsappOtp);
// Keep legacy/mock login for now if needed, or remove
// router.post('/auth/login', controller.login);

// Data
router.get('/locations', controller.getLocations);
router.get('/birds/available', controller.getAvailableBirds);

// Bookings
router.post('/bookings', controller.createBooking);
router.get('/bookings/history', controller.getUserHistory);
router.get('/bookings/:bookingId', controller.getBookingStatus);

// User
router.get('/user/profile', controller.getUserProfile);

module.exports = router;
