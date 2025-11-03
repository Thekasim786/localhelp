const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CustomerConnectDb = require("../utils/CustomerDB");
const createCustomerModel = require("../models/Customer");

// 🟩 Signup
const Customersignup = async (req, res) => {
  try {
    const conn = await CustomerConnectDb();
    const UserModel = createCustomerModel(conn);

    const { firstName, lastName, email, phoneNumber, address, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newCustomer = new UserModel({
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      password: hashedPassword
    });

    await newCustomer.save();
    return res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("❌ Signup error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// 🟩 Login
const CustomerLogin = async (req, res) => {
  try {
    const conn = await CustomerConnectDb();
    const UserModel = createCustomerModel(conn);

    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = 'Auth failed: email or password is wrong';

    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      message: "Login Success",
      success: true,
      jwtToken,
      email,
      name: `${user.firstName} ${user.lastName}`
    });

  } catch (err) {
    console.error("❌ Login error:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

module.exports = { Customersignup, CustomerLogin };
