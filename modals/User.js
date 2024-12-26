const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes unnecessary whitespace
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  salary: {
    type: Number,
    required: true,
    min: 0, // Ensures salary is not negative
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate emails
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email address",
    ],
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\d{10}$/,
      "Phone number must be exactly 10 digits",
    ],
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfJoining: {
    type: Date,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true, // Indicates whether the employee is currently active
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the creation date
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically sets the update date
  },
});



// Export the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
