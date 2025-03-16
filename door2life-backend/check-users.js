const mongoose = require('mongoose');
require('dotenv').config();

// Modelo de usuario (asegúrate de que la ruta sea correcta)
const User = require('./models/user-model');

async function checkUsers() {
  try {
    // Conectar a la base de datos
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado a MongoDB');

    // Buscar todos los usuarios
    const users = await User.find({});
    console.log(`Encontrados ${users.length} usuarios`);
    
    // Mostrar detalles básicos de cada usuario
    users.forEach((user, index) => {
      console.log(`\nUsuario ${index + 1}:`);
      console.log(`Email: ${user.email}`);
      console.log(`Nombre de usuario: ${user.username}`);
      console.log(`Contraseña (hash): ${user.password}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Cerrar la conexión
    mongoose.connection.close();
    console.log('Conexión cerrada');
  }
}

checkUsers();