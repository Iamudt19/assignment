const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/feedants_competition';
    const conn = await mongoose.connect(connStr, { serverSelectionTimeoutMS: 2000 });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[Warning] MongoDB not running locally: ${error.message}`);
    console.warn(`Backend running with in-memory fallback mode.`);
  }
};

module.exports = connectDB;
