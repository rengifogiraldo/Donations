const mongoose = require('mongoose');
require('dotenv').config();

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a la base de datos');
    
    const User = require('./models/user-model');
    
    // Buscar usuarios
    const juanUser = await User.findOne({ email: 'juanreyes2@gmail.com' });
    const marcoUser = await User.findOne({ email: 'marcorengifo28@gmail.com' });
    
    if (!juanUser || !marcoUser) {
      console.log('Alguno de los usuarios no fue encontrado');
      return;
    }
    
    console.log('Estado actual:');
    console.log('Juan referredBy:', juanUser.referredBy);
    console.log('Marco referredBy:', marcoUser.referredBy);
    
    // Corregir la relación
    // 1. Limpiar referredBy de Juan (no debería tener a nadie, él es el fundador)
    juanUser.referredBy = [];
    await juanUser.save();
    
    // 2. Establecer que Marco fue invitado por Juan
    marcoUser.referredBy = [juanUser._id];
    await marcoUser.save();
    
    console.log('\nRelación corregida:');
    console.log('Juan referredBy (debería estar vacío):', juanUser.referredBy);
    console.log('Marco referredBy (debería tener a Juan):', marcoUser.referredBy);
    
    mongoose.disconnect();
    console.log('Desconectado de la base de datos');
  } catch (error) {
    console.error('Error:', error);
    mongoose.disconnect();
  }
}

main();
