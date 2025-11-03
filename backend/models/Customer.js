// customer.jsx
const mongoose = require("mongoose");

// Define the Customer schema
const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  
}, {
  timestamps: true,
});

// Optional: add a pre-save hook to check password matching
//customerSchema.pre("save", function(next) {
//  if (this.password !== this.confirmPassword) {
//    throw new Error("Passwords do not match");
//  }
//  next();
//});
//
module.exports = (conn) => conn.model("Customer", customerSchema);