const mongoose = require("mongoose");

const trasanctionsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categorySchema",
    },
    subcategory: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      default: new Date(),
    },
    isDirect: {
      type: Boolean,
      default: true,
    },
    bank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bankSchema",
    },
    transactionBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "familyMemberSchema",
    },
    transactionFor: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timeStamp: true }
);

module.exports = mongoose.model("trasanctionsSchema", trasanctionsSchema);