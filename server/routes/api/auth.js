const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Import User model
const User = require('../../models/User');

// POST Create New User
// @route post http://localhost:5000/api/auth/signup
// @description: Register New User (Sign-Up)
// @access Public
router.post('/signup', async (req, res) => {
    // Destructuring object new user
    const { email, password } = req.body;
    
    // Simple Fields Validation
    if (!email || !password) {
        return res.status(400).json({ success: false, msg: 'Please enter all fields!' });
    };
    
    // Checking email address format
    if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return res.status(400).json({ success: false, msg: `The following ${email} is not a valid email.`})
    };
    
    // Checking if email address already exists
    const userEmail = await User.findOne({ email: email });
    
    if (userEmail) {
        return res.status(400).json({ success: false, msg: `User already exists with this email: ${email}.`});
    };
    
    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(password, salt);

    // Displaying Error messages for hashing password
    if (!salt) throw Error('Something went wrong with bcrypt.')
    if(!hashPwd) throw Error('Something went wrong while hashing the password.')

    try {
        const newUser = new User({
            email, 
            password: hashPwd
        });

        const savedUser = await newUser.save();

        // Creating unique token - 24hours
        const token = await jwt.sign(
            {id: savedUser.id},
            process.env.JWT_SECRET,
            { expiresIn: 86400 }
        );
        
        if (!savedUser) throw Error('Something went wrong while saving the user.')
        res.status(200).json({
            success: true,
            token,
            user: {
                id: savedUser.id,
                email: savedUser.email,
                password: hashPwd,
                counter: savedUser.counter
            }
        });

    } catch(err) {
        resstatus(400).json({ success: false, msg: err })
    };
});

// POST Login an existing User
// @route post http://localhost:5000/api/auth/signin
// @description: Login user (Sign-In)
// @access Public
router.post('/signin', async (req, res) => {
    // Destructuring object user Login Details
    const { email, password } = req.body;

    // Validating fields
    if (!email || !password) {
        return res.status(400).json({ success: false, msg: 'Please enter all fields.' });
    };

    // Checking if User exists
    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(400).json({ success: false, msg: `User with email: ${email} does not exist.` });
    };

    try {
        if (user) {
            // Checking if password matchs
            const pwdMatch = await bcrypt.compare(password, user.password);
    
            if (!pwdMatch) {
                return res.status(400).json({ success: false, msg: 'Invalid credentials.'});
            };
    
            // Creating & sending unique token - 24hours
            const token = await jwt.sign(
                { id: user.id }, 
                process.env.JWT_SECRET, 
                { expiresIn: 86400}
            );

            res.status(200).json({
                success: true,
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    counter: user.counter
                }
            });
        };
    } catch (err) {
        return res.status(400).json({ success: false, msg: err });
    };
});

module.exports = router;