require("dotenv").config();
const mongoose = require("mongoose");
const URI_ServiceProvider = process.env.MONGODB_URI_ServiceProvider;

const ServiceProviderConnectDb = async () => {
  try {
    await mongoose.createConnection(URI_ServiceProvider, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    }
);
    console.log("✅ MongoDB Atlas service provider db connected successfully!");
    console.log("Mongo URI:", URI_ServiceProvider);

  } catch (error) {
    console.error("❌ Database connection failed:", error);
    console.log("Mongo URI:", URI_ServiceProvider);
    process.exit(0);
    

  }
};
module.exports = ServiceProviderConnectDb;