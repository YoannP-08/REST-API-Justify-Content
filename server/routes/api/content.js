const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import Content Model
const Content = require('../../models/Content');

// POST one content
// @route post http://localhost:5000/api/content
// @description: Return a content in plain/text && justified
//               to 80 characters max
// @access Private
router.post('/', async (req, res) => {
    // Destructure object new Content
    const { text, userId } = req.body;

    // Simple Field Validation
    if (!text) {
        return res.status(400).json({ success: false, msg: 'Text field cannot be empty!' });
    };

    // Checking
    if (!userId) {
        return res.status(400).json({ success: false, msg: 'User Id missing.'})
    };

    try {
        const newContent = new Content({
            text, 
            userId
        });

        const savedContent = await newContent.save();

        if (!savedContent) throw Error('Something went wrong while saving the content.');
        res.set('Content-Type', 'text/plain')
        res.status(200)
        res.send(text)

    } catch (err) {
        return res.status(400).json({ success: false, msg: err});
    };
});

module.exports = router;