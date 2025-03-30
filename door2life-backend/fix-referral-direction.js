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
    
    // Corregir la relación SEGÚN LA LÓGICA DEL CONTROLADOR
    // Marco debe estar en referredBy de Juan (al revés de lo que sería lógico)
    // porque el controlador busca "quién refirió a" en lugar de "a quién refirió"
    
    // 1. Limpiar referredBy de Marco
    marcoUser.referredBy = [];
    await marcoUser.save();
    
    // 2. Añadir a Marco como referido de Juan
    juanUser.referredBy = [marcoUser._id];
    await juanUser.save();
    
    console.log('\nRelación corregida según la lógica del controlador:');
    console.log('Juan referredBy (debería tener a Marco):', juanUser.referredBy);
    console.log('Marco referredBy (debería estar vacío):', marcoUser.referredBy);
    
    mongoose.disconnect();
    console.log('Desconectado de la base de datos');
  } catch (error) {
    console.error('Error:', error);
    mongoose.disconnect();
  }
}

main();
