
require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const User = require("./models/user-model");
const Admin = require("./models/admin-Model");

// Función para importar documentos verificando si ya existen
async function importDocuments(Model, documents, identifierField) {
  let created = 0;
  let updated = 0;
  let skipped = 0;
  
  for (const doc of documents) {
    try {
      const query = {};
      query[identifierField] = doc[identifierField];
      
      const exists = await Model.findOne(query);
      
      if (exists) {
        // Actualizar documento existente
        const result = await Model.updateOne(query, { $set: doc });
        if (result.modifiedCount > 0) {
          updated++;
        } else {
          skipped++;
        }
      } else {
        // Crear nuevo documento
        await new Model(doc).save();
        created++;
      }
    } catch (error) {
      console.error(`Error al procesar documento ${doc[identifierField]}:`, error);
    }
  }
  
  return { created, updated, skipped };
}

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Conectado a MongoDB");
    
    // Importar usuarios regulares
    if (fs.existsSync("users_export.json")) {
      const users = JSON.parse(fs.readFileSync("users_export.json"));
      const userStats = await importDocuments(User, users, "email");
      console.log(`Usuarios: ${userStats.created} creados, ${userStats.updated} actualizados, ${userStats.skipped} sin cambios`);
    }
    
    // Importar administradores
    if (fs.existsSync("admins_export.json")) {
      const admins = JSON.parse(fs.readFileSync("admins_export.json"));
      const adminStats = await importDocuments(Admin, admins, "email");
      console.log(`Administradores: ${adminStats.created} creados, ${adminStats.updated} actualizados, ${adminStats.skipped} sin cambios`);
    }
    
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("Error al conectar con MongoDB:", err);
  });

