const mongoose = require('mongoose');
require('dotenv').config();

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a la base de datos');
    
    const User = require('./models/user-model');
    
    // Obtener todos los usuarios para inspeccionar la estructura
    const allUsers = await User.find({});
    console.log('Estructura del primer usuario:', JSON.stringify(allUsers[0], null, 2));
    
    // Buscar usuarios Juan y Marco
    const juanUser = await User.findOne({ email: 'juanreyes2@gmail.com' });
    const marcoUser = await User.findOne({ email: 'marcorengifo28@gmail.com' });
    
    if (!juanUser || !marcoUser) {
      console.log('Alguno de los usuarios no fue encontrado');
      return;
    }
    
    console.log('Estado actual:');
    console.log('Juan _id:', juanUser._id);
    console.log('Juan referredBy:', juanUser.referredBy);
    console.log('Marco _id:', marcoUser._id);
    console.log('Marco referredBy:', marcoUser.referredBy);
    
    // 1. Asegurarnos que el modelo sea correcto
    // Si Juan es el fundador, debe tener referredBy vacío
    juanUser.referredBy = [];
    await juanUser.save();
    
    // 2. Marco fue invitado por Juan, así que debe tener a Juan en su referredBy
    marcoUser.referredBy = [juanUser._id];
    await marcoUser.save();
    
    // 3. Verificar si hay una relación inversa (array de "downlines" o similar)
    // Buscar todos los campos del modelo para entender la estructura
    const userSchema = User.schema.obj;
    console.log('Campos del modelo de usuario:', Object.keys(userSchema));
    
    // Verificar si hay otros campos que podrían ser relevantes
    const juanFields = Object.keys(juanUser.toObject());
    console.log('Todos los campos de Juan:', juanFields);
    
    // Verificar si el sistema usa otros campos para la relación
    if (juanUser.downlines) {
      console.log('Campo downlines encontrado, actualizando...');
      juanUser.downlines = [marcoUser._id];
      await juanUser.save();
    }
    
    // Verificar si hay otros campos de relación que no conocemos
    if (juanUser.team) {
      console.log('Campo team encontrado, actualizando...');
      juanUser.team = [marcoUser._id];
      await juanUser.save();
    }
    
    if (juanUser.referrals) {
      console.log('Campo referrals encontrado, actualizando...');
      juanUser.referrals = [marcoUser._id];
      await juanUser.save();
    }
    
    // 4. Verificar el resultado final
    const updatedJuan = await User.findOne({ email: 'juanreyes2@gmail.com' });
    const updatedMarco = await User.findOne({ email: 'marcorengifo28@gmail.com' });
    
    console.log('\nEstado final:');
    console.log('Juan referredBy:', updatedJuan.referredBy);
    console.log('Marco referredBy:', updatedMarco.referredBy);
    
    mongoose.disconnect();
    console.log('Desconectado de la base de datos');
  } catch (error) {
    console.error('Error:', error);
    mongoose.disconnect();
  }
}

main();
