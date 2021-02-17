// @middleware: create an authenticated middleware to
//              protect selected routes and ensure user
//              is authenticated with a token to go through
//              its requests.  

const jwt = require('jsonwebtoken');
require('dotenv/config');

function authentication(req, res, next) {
    const token = req.header('token');

    // Checking token
    if (!token) {
        res.status(401).json({ msg: 'No token, unauthorized.'});
    };

    try {
        // Verifying token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        //Adding user to request from payload
        req.user = decoded;
        next();
    } catch(exception) {
        res.status(400).json({ msg: 'Invalid Token.'});
    };
};

module.exports = authentication;