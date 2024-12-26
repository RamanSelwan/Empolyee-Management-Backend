const express = require("express");
const connectDB = require("./config/db"); // Ensure this file exports a proper connection function
const EmployeeRoutes = require("./routes/EmployeeRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();
app.use(cors());
// Middleware to parse incoming JSON requests
app.use(express.json());

// Use EmployeeRoutes for /api/employee path
app.use("/api/employee", EmployeeRoutes);

// 404 Route Not Found Middleware
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
