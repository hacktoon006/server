// app.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./db/config");

// Routes
const authRoutes = require("./routes/authRoutes");
const downloadRoutes = require("./routes/downloadRoutes");
const blogRoutes = require("./routes/blogRoutes");
const chatRoutes = require("./routes/chatRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(
  cors({
    origin: "https://hacktoon-world-gowtham006ks-projects.vercel.app",
    credentials: true,
  })
);
// Middleware
const allowedOrigins = [
  "https://hacktoon-world-gowtham006ks-projects.vercel.app", // ✅ your Vercel frontend
  "http://localhost:3000",             // ✅ for local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api", authRoutes); // auth endpoints like /api/register, /api/login
app.use("/api/downloads", downloadRoutes); // /api/downloads/*
app.use("/api", blogRoutes); // e.g., /api/blogs
app.use("/api/chats", chatRoutes); // e.g., /api/chats (chat endpoints)

// Root
app.get("/", (req, res) => {
  res.send("🚀 HackToon API Running");
});

module.exports = app;
