const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1000
    },
    counter: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema);