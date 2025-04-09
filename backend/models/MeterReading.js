const mongoose = require("mongoose");

const meterCheckSchema = new mongoose.Schema({
  current: Number,
  voltage: Number,
  power:Number,
  timestamp:Number,
})

module.exports = mongoose.model("MeterReading", meterCheckSchema);