const express = require("express");
const router = express.Router();
const {
  sendEmail,
} = require("../../Controllers/Contact-controller/contactEmail.js");
// email router set
router.post("/send-email", sendEmail);

module.exports = router;
