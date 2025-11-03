require("dotenv").config();
const express = require("express");
const cors = require("cors");

const CustomerConnectDb = require("./utils/CustomerDB");
const ServiceProviderConnectDb = require("./utils/ServiceProviderDB");
const authRoutes = require("./routes/CustomerAuth");

const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');


app.use(bodyParser.json());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "*",
  credentials: true
}));

// Connect both databases
(async () => { 
  const customerConn = await CustomerConnectDb();
  const serviceProviderConn = await ServiceProviderConnectDb();

  // You can now use customerConn and serviceProviderConn to create models
  // e.g. const Customer = customerConn.model("Customer", customerSchema);

  // Routes
  app.use("/api/auth", authRoutes);

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      success: true,
      message: "Server is running",
      timestamp: new Date().toISOString()
    });
  });
  

  // Start server
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
})();
