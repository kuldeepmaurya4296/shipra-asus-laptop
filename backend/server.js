const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config/env');
const apiRoutes = require('./routes/api');

const app = express();
const connectDB = require('./config/db');

// Connect to Database
connectDB();


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', apiRoutes);

// Health Check
app.get('/', (req, res) => {
    res.send('Shipra Backend API is running...');
});

// Start Server
app.listen(config.port, '0.0.0.0', () => {
    console.log(`\n🚀 Shipra Backend running at http://localhost:${config.port}`);
    console.log(`📡 For Android Emulator use: http://10.0.2.2:${config.port}`);
    console.log(`📱 For Physical Device use: http://YOUR_LOCAL_IP:${config.port}\n`);
});
