const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Content Schema
const ContentSchema = new Schema({
    text: {
        type: String,
    },
})

module.exports = mongoose.model('Content', ContentSchema);