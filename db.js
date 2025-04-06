const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL);


mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB Connection Error:', err);
});

mongoose.connection.on('connected', () => {
    console.log('✅ Connected to MongoDB');
});

mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ Disconnected from MongoDB');
});



// Export mongoose for use in models
module.exports = mongoose;
