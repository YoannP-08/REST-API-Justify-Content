const jwt = require('jsonwebtoken');
require('dotenv/config');

function authentication(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];

    // Checking token
    if (!token) {
        return res.status(401).json({ msg: 'No token, unauthorized.'});
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