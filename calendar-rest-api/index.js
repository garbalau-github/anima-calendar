const express = require('express');
const app = express();
const mongoose = require('mongoose');
const events = require('./routes/events');
const cors = require('cors');
require('dotenv').config();

// Constants
const PORT = process.env.PORT || 5000;

// Database
mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((error) => {
        console.log('Failed to connect to MongoDB');
        console.log(error);
    });

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/events', events);

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
