const mongoose = require('mongoose');
const config = require('./env');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.mongoUri);
        console.log(`\nMongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`\nError: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
