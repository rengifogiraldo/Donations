const mongoose = require("mongoose");

const mainBankSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const MainBank = mongoose.model("MainBank", mainBankSchema);

module.exports = MainBank;
