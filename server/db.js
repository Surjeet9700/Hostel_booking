const mongoose = require('mongoose');
require('dotenv').config();

const dbConnectionString = process.env.MONGO_CONNECTION_STRING;

const connectDB = async () => {
    try {
        await mongoose.connect(dbConnectionString);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;