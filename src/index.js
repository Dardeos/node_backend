const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const cors = require('cors');
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const eventRoutes = require('./routes');
app.use('/api', eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Node server is running on port ${PORT}`);
});