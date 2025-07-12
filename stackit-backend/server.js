const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const questionRoutes = require("./routes/questionRoutes");
const authRoutes = require("./routes/authRoutes"); // if you have login/register routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/questions", questionRoutes);
app.use("/api/auth", authRoutes); // Register/login endpoints

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/stackit", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB connected");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
});

// Optional: Catch-all error logger
app.use((err, req, res, next) => {
  console.error("🔥 Unhandled error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});
