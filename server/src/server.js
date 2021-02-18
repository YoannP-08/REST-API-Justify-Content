const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

// Assign environment variables
const port = process.env.PORT || 5000;
const db = process.env.MONGO_URI;

// Initialise express server
const app = express();

// Adding express.text() to support text/plain content-type
app.use(express.json(), express.text());

// Connect DB
// Adding new mongo DB url parser
mongoose.connect(db, 
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
    .then(() => console.log('DB Connected...'))
    .catch(err => console.log(err))

// Import Routes
const authRoutes = require('../routes/api/auth');
const contentRoutes = require('../routes/api/content');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/justify', contentRoutes);

app.listen(port, () => console.log(`Started on server port ${port}.`));

// module.exports = app;