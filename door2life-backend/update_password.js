require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user-model');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Conectado a MongoDB');
    try {
      // Generar hash para la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('user123', salt);
      
      // Actualizar la contraseña
      const result = await User.updateOne(
        { email: 'juanreyes2@gmail.com' },
        { $set: { password: hashedPassword } }
      );
      
      console.log('Actualización:', result);
      
      // Verificar que la contraseña se haya actualizado correctamente
      const user = await User.findOne({ email: 'juanreyes2@gmail.com' });
      if (user) {
        const isMatch = await bcrypt.compare('user123', user.password);
        console.log('Contraseña actualizada y verificada:', isMatch);
      } else {
        console.log('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      mongoose.connection.close();
    }
  })
  .catch(err => {
    console.error('Error de conexión:', err);
  });
