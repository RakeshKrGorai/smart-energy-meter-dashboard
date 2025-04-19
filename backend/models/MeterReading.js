const mongoose = require("mongoose");

const meterCheckSchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: true,
    },
    current: {
      type: Number,
    },
    voltage: {
      type: Number,
    },
    power: {
      type: Number,
    },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("MeterReading", meterCheckSchema);
