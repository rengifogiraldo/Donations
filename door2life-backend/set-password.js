const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function setPassword() {
  try {
    // Conectar a la base de datos
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado a MongoDB');

    // Generar el hash manualmente
    const plainPassword = 'user123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    
    console.log('Hash generado para la contraseña:', hashedPassword);
    
    // Actualizar directamente en la base de datos para evitar middleware
    const result = await mongoose.connection.db.collection('users').updateOne(
      { email: 'juanreyes2@gmail.com' },
      { $set: { password: hashedPassword } }
    );
    
    console.log('Resultado de la actualización:', result);
    
    // Verificar si la contraseña se actualizó correctamente
    const user = await mongoose.connection.db.collection('users').findOne(
      { email: 'juanreyes2@gmail.com' }
    );
    
    console.log('Contraseña actualizada:', user.password);
    
    // Verificar si la contraseña coincide con el hash
    const isMatch = await bcrypt.compare(plainPassword, user.password);
    console.log(`¿La contraseña "${plainPassword}" coincide con el nuevo hash? ${isMatch}`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Cerrar la conexión
    mongoose.connection.close();
    console.log('Conexión cerrada');
  }
}

setPassword();