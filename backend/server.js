const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const competitionRoutes = require('./routes/competitionRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/competitions', competitionRoutes);

// Root health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'Feedants Competition API' });
});

// Connect Database in background & Start Server immediately
const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Feedants Backend API server running on port ${PORT}`);
});

module.exports = app;
