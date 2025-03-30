const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function setPassword(email, newPassword) {  // Ahora recibe parámetros
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');

    // Generar hash (versión simplificada y más segura)
    const hashedPassword = await bcrypt.hash(newPassword, 10);  // Salt rounds incluidos en el hash
    console.log('Hash generado para la contraseña:', hashedPassword);

    // Actualizar en la base de datos
    const result = await mongoose.connection.db.collection('users').updateOne(
      { email: email },
      { $set: { password: hashedPassword } }
    );
    console.log('Resultado de la actualización:', result);

    // Verificación adicional
    const user = await mongoose.connection.db.collection('users').findOne({ email: email });
    const isMatch = await bcrypt.compare(newPassword, user.password);
    console.log(`¿La contraseña "${newPassword}" coincide con el nuevo hash?`, isMatch);

  } catch (error) {
    console.error('Error crítico:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Conexión cerrada');
  }
}

// Uso: node set-password.js <email> <nueva-contraseña>
const args = process.argv.slice(2);
if (args.length === 2) {
  setPassword(args[0], args[1]);
} else {
  console.log('Uso correcto: node set-password.js <email> <nueva-contraseña>');
}