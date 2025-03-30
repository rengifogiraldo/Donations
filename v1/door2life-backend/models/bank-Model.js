const mongoose = require("mongoose");

const mainBankSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  // Nuevos campos para método de pago
  paymentMethod: { 
    type: String, 
    enum: ["paypal", "manual"], 
    default: "paypal" 
  },
  paymentStatus: { 
    type: String, 
    enum: ["pending", "completed", "rejected"], 
    default: "completed" 
  }
});

const MainBank = mongoose.model("MainBank", mainBankSchema);
module.exports = MainBank;