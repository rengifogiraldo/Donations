const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Modelo de usuario
const User = require('./models/user-model');

async function fixUser() {
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
    
    console.log('Usuario encontrado:');
    console.log(`ID: ${user._id}`);
    console.log(`Email: ${user.email}`);
    console.log(`Nombre: ${user.username}`);
    console.log(`Contraseña (hash): ${user.password}`);
    
    // Probar la contraseña actual
    const testPassword = 'user123';
    try {
      const isMatch = await bcrypt.compare(testPassword, user.password);
      console.log(`¿La contraseña "${testPassword}" coincide con el hash? ${isMatch}`);
    } catch (error) {
      console.log('Error al verificar la contraseña:', error);
    }
    
    // Actualizar la contraseña a una versión sin hash para probar
    console.log('\nActualizando contraseña a versión sin hash...');
    user.password = 'user123';
    await user.save();
    console.log('Contraseña actualizada a versión sin hash');
    
    // Verificar la actualización
    const updatedUser = await User.findOne({ email });
    console.log(`Nueva contraseña: ${updatedUser.password}`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Cerrar la conexión
    mongoose.connection.close();
    console.log('Conexión cerrada');
  }
}

fixUser();