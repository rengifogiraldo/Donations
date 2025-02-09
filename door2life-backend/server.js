require("dotenv").config();
const connectDb = require("./utils/db");
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose'); // Add this


const router = require("./Routes/auth-router/auth-router");
const adminRoutes = require("./Routes/auth-router/adminRouter");
const refRouter = require("./Routes/Ref-Routes/refRouter");
const userRoutes = require("./Routes/User-router/userRouter");
const bankRoutes = require("./Routes/bank-Router/bankRouter");
const messageRoutes = require("./Routes/Messgae-Router/messageRouter");
const contactRouter = require("./Routes/Contact-Router/contactRouter");

const app = express();

const PORT = 8000;
// Add this to check MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB:', process.env.MONGODB_URI);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://openingdoors2life.org",
      "https://meek-swan-915441.netlify.app",
      "http://localhost:5173", // Local development
      "http://localhost:3000", // Alternative local port
      "http://89.117.23.68:5173",  // Added your server IP
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", 'PATCH', "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.options("*", cors()); // Enable pre-flight for all routes

app.use("/api/auth", router);
app.use("/api/auth/admin", adminRoutes);
app.use("/api/auth/referrals", refRouter);
app.use("/api/user", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/bank", bankRoutes);
app.use("/api/contact", contactRouter);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`hello from the server side ${PORT}`);
  });
});
