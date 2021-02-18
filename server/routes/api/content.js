const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../../middleware/authentication');

// Import Content Model
const Content = require('../../models/Content');

// POST one content
// @route post http://localhost:5000/api/content
// @description: Return a content in plain/text && justified
//               to 80 characters max
// @access Private
router.post('/', auth, async (req, res) => {
    // Destructuring object new Content
    // method to handle post with json req.body
    // const { text, userId } = req.body;

    const text = req.body; // method to handle post with text/plain req.body

    // Validating field
    if (!text) {
        return res.status(400).json({ success: false, msg: 'Text field cannot be empty!' });
    };

    // // Checking if userId is provided
    // if (!userId) {
    //     return res.status(400).json({ success: false, msg: 'User Id missing.'})
    // };

    try {
        const newContent = new Content({
            text, 
            // userId
        });

        const savedContent = await newContent.save();

        if (!savedContent) throw Error('Something went wrong while saving the content.');

        res.set('Content-Type', 'text/plain').status(200).send(text)

    } catch (err) {
        return res.status(400).json({ success: false, msg: err});
    };
});

module.exports = router;