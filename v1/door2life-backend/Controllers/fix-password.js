const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/user-model');

async function fixPassword() {
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
    console.log(`Email: ${user.email}`);
    console.log(`Contraseña actual (almacenada): ${user.password}`);
    
    // Verificar si la contraseña actual ya es un hash
    const isHash = user.password.startsWith('$2a$') || user.password.startsWith('$2b$');
    console.log(`¿La contraseña parece ser un hash bcrypt? ${isHash}`);
    
    // Establecer una nueva contraseña y hashearla correctamente
    const newPassword = 'user123';
    
    // Actualizar la contraseña sin usar el middleware
    user.password = newPassword;
    user.$skipMiddleware = false; // Permitir que el middleware funcione
    
    await user.save();
    
    // Verificar que la contraseña se haya guardado correctamente
    const updatedUser = await User.findOne({ email });
    console.log(`Nueva contraseña (sin hash): ${newPassword}`);
    console.log(`Contraseña actualizada (almacenada): ${updatedUser.password}`);
    
    // Verificar que podamos hacer login con la nueva contraseña
    const passwordMatch = await bcrypt.compare(newPassword, updatedUser.password);
    console.log(`¿La contraseña se puede verificar con bcrypt? ${passwordMatch}`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Cerrar la conexión
    mongoose.connection.close();
    console.log('Conexión cerrada');
  }
}

fixPassword();
