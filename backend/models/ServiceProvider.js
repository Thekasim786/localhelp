// models/ServiceProvider.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const serviceProviderSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
category: {
  type: String,
  required: true,
  enum: ["Electrician", "Plumber", "Carpenter", "Cleaner", "Painter", "Mechanic", "Gardener", "Other"]
},
customCategory: {
  type: String,
  validate: {
    validator: function(value) {
      return this.category === "Other" ? !!value : true;
    },
    message: "Please specify custom category when selecting 'Other'."
  }
},
  experience: {
    type: Number, // in years
    required: true,
    min: 0
  },
 // ratePerHour: {
 //   type: Number,
 //   required: true
 // },
  address: {
    type: String,
    required: true
  }
 // policeVerification: {
 //   type: Boolean,
 //   default: false
 // },
 // verifiedAt: {
 //   type: Date
 // },
 // profileImage: {
 //   type: String, // URL to uploaded image
 //   default: ""
 // },
 // rating: {
 //   type: Number,
 //   default: 0,
 //   min: 0,
 //   max: 5
 // },
 // totalJobs: {
 //   type: Number,
 //   default: 0
 // },
 // isAvailable: {
 //   type: Boolean,
 //   default: true
 // }
//
 
}, { timestamps: true });

// Hash password before saving
serviceProviderSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const ServiceProvider = mongoose.model("ServiceProvider", serviceProviderSchema);
module.exports = ServiceProvider;
