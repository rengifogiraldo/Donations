const mongoose = require('mongoose');
require('dotenv').config();

// Modelos
const User = require('./models/user-model');
const Admin = require('./models/admin-Model');

async function checkAllUsers() {
  try {
    // Conectar a la base de datos
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado a MongoDB');
    
    // Buscar todos los usuarios regulares
    const users = await User.find({});
    console.log(`\n=== USUARIOS REGULARES ===`);
    console.log(`Encontrados ${users.length} usuarios regulares`);
    
    users.forEach((user, index) => {
      console.log(`\nUsuario ${index + 1}:`);
      console.log(`Email: ${user.email}`);
      console.log(`Nombre de usuario: ${user.username}`);
    });
    
    // Buscar todos los administradores
    const admins = await Admin.find({});
    console.log(`\n\n=== ADMINISTRADORES ===`);
    console.log(`Encontrados ${admins.length} administradores`);
    
    admins.forEach((admin, index) => {
      console.log(`\nAdministrador ${index + 1}:`);
      console.log(`Email: ${admin.email}`);
      console.log(`Nombre de usuario: ${admin.username}`);
      console.log(`Rol: ${admin.role}`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Cerrar la conexión
    mongoose.connection.close();
    console.log('Conexión cerrada');
  }
}

checkAllUsers();
