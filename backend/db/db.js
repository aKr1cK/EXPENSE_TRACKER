const mongoose = require("mongoose");

const db = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB CONNECTED");
  } catch (e) {
    console.log("DB FAILED TO CONNECT");
  }
};

module.exports = { db };