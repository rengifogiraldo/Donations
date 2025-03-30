
require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const User = require("./models/user-model");
const Admin = require("./models/admin-Model");

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Conectado a MongoDB");
    
    // Exportar usuarios regulares
    const users = await User.find({});
    fs.writeFileSync("users_export.json", JSON.stringify(users, null, 2));
    console.log(`Exportados ${users.length} usuarios regulares`);
    
    // Exportar administradores
    const admins = await Admin.find({});
    fs.writeFileSync("admins_export.json", JSON.stringify(admins, null, 2));
    console.log(`Exportados ${admins.length} administradores`);
    
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("Error al conectar con MongoDB:", err);
  });

