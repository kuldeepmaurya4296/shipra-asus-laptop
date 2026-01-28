const User = require('../models/User');
const Otp = require('../models/Otp');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const twilio = require('twilio');
const config = require('../config/env');

// Initialize Clients
const googleClient = new OAuth2Client(config.googleClientId);

// Safe Twilio Init: Only initialize if keys are present
let twilioClient;
try {
    if (config.twilioSid && config.twilioAuthToken) {
        twilioClient = new twilio(config.twilioSid, config.twilioAuthToken);
    } else {
        console.warn('⚠️ Twilio keys missing in logic. WhatsApp OTP will be logged to console.');
    }
} catch (e) {
    console.error('Twilio Init Error:', e.message);
}

// Helper: Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, config.jwtSecret, { expiresIn: '30d' });
};

// --- Google Auth ---
exports.googleLogin = async (req, res) => {
    const { token } = req.body;

    try {
        // Verify Google Token
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        });
        const { name, email, sub: googleId, picture } = ticket.getPayload();

        // Find or Create User
        let user = await User.findOne({ googleId });

        if (!user) {
            // Check if email validation exists (optional logic)
            // If user exists by email but not googleId, link them? For now, create new.
            user = await User.findOne({ email });
            if (user) {
                user.googleId = googleId;
                user.avatar = picture;
                await user.save();
            } else {
                user = await User.create({
                    name,
                    email,
                    googleId,
                    avatar: picture
                });
            }
        }

        res.json({
            success: true,
            token: generateToken(user._id),
            user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar }
        });

    } catch (error) {
        console.error('Google Auth Error:', error);
        res.status(401).json({ success: false, message: 'Invalid Token' });
    }
};

// --- WhatsApp OTP ---
exports.sendWhatsappOtp = async (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ success: false, message: 'Phone number required' });

    // Generate 6 digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        // Check if we can use real Twilio
        if (!config.useMockAuth && twilioClient) {
            await twilioClient.messages.create({
                body: `Your Shipra verification code is ${otpCode}`,
                from: `whatsapp:${config.twilioPhoneNumber}`,
                to: `whatsapp:${phone}`
            });
        } else {
            console.log(`\n✅ [SIMULATION] WhatsApp OTP for ${phone}: ${otpCode}\n`);
            // If explicit mock auth wasn't requested but we fell back due to missing keys, warn
            if (!config.useMockAuth) {
                console.warn('⚠️ Twilio Client not active. Sending simulated OTP.');
            }
        }

        // Save OTP to DB (upsert)
        await Otp.findOneAndUpdate(
            { phone },
            { otp: otpCode },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        res.json({ success: true, message: 'OTP sent successfully' });

    } catch (error) {
        console.error('Send OTP Error:', error);
        res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
};

exports.verifyWhatsappOtp = async (req, res) => {
    const { phone, code, name } = req.body; // Name is optional, for new users

    try {
        // Check OTP
        const validOtp = await Otp.findOne({ phone, otp: code });

        // Strict check: OTP must match DB record
        if (!validOtp) {
            // For testing convenience, allow hardcoded '123456' ONLY if explicitly using mock auth
            if (config.useMockAuth && code === '123456') {
                // Allow
            } else {
                return res.status(400).json({ success: false, message: 'Invalid Code' });
            }
        }

        // Find or Create User
        let user = await User.findOne({ phone });

        if (!user) {
            user = await User.create({
                name: name || 'User', // Default name just so we can proceed
                phone,
                role: 'user'
            });
        }

        // Cleanup OTP
        await Otp.deleteOne({ phone });

        res.json({
            success: true,
            token: generateToken(user._id),
            user: { id: user._id, name: user.name, phone: user.phone }
        });

    } catch (error) {
        console.error('OTP Verify Error:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
