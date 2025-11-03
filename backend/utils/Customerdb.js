require("dotenv").config();
const mongoose = require("mongoose");
const URI_Customer = process.env.MONGODB_URI_customer;


const CustomerConnectDb = async () => {
  try {
    const connection = await mongoose.createConnection(URI_Customer, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Customer DB connected successfully!");
    return connection;
    

    

  } catch (error) {
    console.error("❌ Database connection failed:", error);
    
    console.log("Mongo URI:", URI_Customer);
    process.exit(0);

  }
};



module.exports = CustomerConnectDb;
