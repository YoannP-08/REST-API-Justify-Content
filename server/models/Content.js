const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Content Schema
const ContentSchema = new Schema({
    text: {
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    }
})

module.exports = mongoose.model('Content', ContentSchema);