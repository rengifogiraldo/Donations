const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Modelo de usuario
const User = require('./models/user-model');

async function updatePassword() {
  try {
    // Conectar a la base de datos
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado a MongoDB');

    // Buscar el usuario por email
    const email = 'juanreyes2@gmail.com';
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log(`No se encontró un usuario con el email: ${email}`);
      return;
    }
    
    // Generar hash de la nueva contraseña
    const newPassword = 'user123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Actualizar la contraseña del usuario
    user.password = hashedPassword;
    await user.save();
    
    console.log('Contraseña actualizada correctamente');
    console.log(`Nueva contraseña (sin hash): ${newPassword}`);
    console.log(`Nueva contraseña (hash): ${hashedPassword}`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Cerrar la conexión
    mongoose.connection.close();
    console.log('Conexión cerrada');
  }
}

updatePassword();