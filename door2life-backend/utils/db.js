const mongoose = require("mongoose");
var colors = require('colors');

const dotenv = require('dotenv');
dotenv.config();

const URI = process.env.MONGODB_URI;
// mongoose.connect(URI)

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log(" Database Connected ".bgMagenta.white);
  } catch (error) {
    console.log("connect failed".bgRed.white, error);
    process.exit(0);
  }
};

module.exports = connectDb;
