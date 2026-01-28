const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    available: { type: Boolean, default: true },
    description: { type: String }
});

// Virtual for 'id' to match frontend expectation
locationSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

locationSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Location', locationSchema);
