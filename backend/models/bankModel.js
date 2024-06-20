const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    balance: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  { timeStamp: true }
);

module.exports = mongoose.model("bankSchema", bankSchema);