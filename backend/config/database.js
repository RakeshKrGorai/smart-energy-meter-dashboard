const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async() =>{
    const dbURI = process.env.MONGODB_URI;
    await mongoose.connect(dbURI); 
};

module.exports=connectDB;