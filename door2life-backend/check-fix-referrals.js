const mongoose = require('mongoose');
require('dotenv').config();

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a la base de datos');
    
    const User = require('./models/user-model');
    
    // Buscar usuario Juan Reyes
    const juanUser = await User.findOne({ email: 'juanreyes2@gmail.com' });
    if (!juanUser) {
      console.log('Usuario Juan Reyes no encontrado');
      return;
    }
    
    // Buscar usuario Marco
    const marcoUser = await User.findOne({ email: 'marcorengifo28@gmail.com' });
    if (!marcoUser) {
      console.log('Usuario Marco no encontrado');
      return;
    }
    
    console.log('Estado actual de referidos:');
    console.log('Juan Reyes ID:', juanUser._id);
    console.log('Juan Reyes referralCode:', juanUser.referralCode);
    console.log('Juan Reyes referredBy:', juanUser.referredBy || []);
    console.log('Marco ID:', marcoUser._id);
    console.log('Marco referralCode:', marcoUser.referralCode);
    console.log('Marco referredBy:', marcoUser.referredBy || []);
    
    // Corregir la relación: hacer que Marco sea referido por Juan
    if (!marcoUser.referredBy || !marcoUser.referredBy.includes(juanUser._id)) {
      // Si Marco no tiene referidos o Juan no está en la lista
      if (!marcoUser.referredBy) {
        marcoUser.referredBy = [];
      }
      marcoUser.referredBy.push(juanUser._id);
      await marcoUser.save();
      console.log('Relación corregida: Marco ahora es referido por Juan');
    }
    
    // Verificar si Juan tiene a Marco en su lista de referidos
    if (!juanUser.referredBy) {
      juanUser.referredBy = [];
    }
    
    // Verificar si Marco ya está en la lista de referidos de Juan
    const marcoInReferrals = juanUser.referredBy.some(id => id.toString() === marcoUser._id.toString());
    
    if (!marcoInReferrals && juanUser.referredBy.length < 2) {
      juanUser.referredBy.push(marcoUser._id);
      await juanUser.save();
      console.log('Relación corregida: Marco añadido a la lista de referidos de Juan');
    } else if (!marcoInReferrals) {
      console.log('Juan ya tiene 2 referidos, no se puede añadir a Marco');
    } else {
      console.log('Marco ya está en la lista de referidos de Juan');
    }
    
    // Mostrar estado final
    const updatedJuan = await User.findOne({ email: 'juanreyes2@gmail.com' });
    const updatedMarco = await User.findOne({ email: 'marcorengifo28@gmail.com' });
    
    console.log('\nEstado final de referidos:');
    console.log('Juan Reyes referredBy:', updatedJuan.referredBy || []);
    console.log('Marco referredBy:', updatedMarco.referredBy || []);
    
    mongoose.disconnect();
    console.log('Desconectado de la base de datos');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
