const mongoose = require('mongoose');

const birdSchema = new mongoose.Schema({
    model: { type: String, required: true },
    status: { type: String, enum: ['Ready', 'Charging', 'Maintenance', 'In-Flight'], default: 'Ready' },
    battery: { type: Number, required: true },
    lat: { type: Number }, // Current position if needed
    lng: { type: Number }
});

// Virtual for 'id'
birdSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

birdSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Bird', birdSchema);
