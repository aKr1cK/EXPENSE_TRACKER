const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timeStamp: true }
);

module.exports = mongoose.model("categorySchema", categorySchema);