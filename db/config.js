const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Debug log: check if URI is loaded
    if (!process.env.MONGO_URI) {
      throw new Error("❌ MONGO_URI not found in environment variables");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // Exit the app if DB connection fails
  }
};

module.exports = connectDB;
