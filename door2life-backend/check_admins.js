const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://door2life:door2life@door2life.obnno.mongodb.net/door2life';
const client = new MongoClient(uri);

async function run() {
  try {
    console.log('Conectando a MongoDB...');
    await client.connect();
    console.log('Conexión exitosa');
    
    const db = client.db('door2life');
    console.log('Colecciones disponibles:');
    const collections = await db.listCollections().toArray();
    collections.forEach(coll => console.log('- ' + coll.name));
    
    // Verificar colección de admins
    const adminsCollection = collections.find(c => c.name === 'admins');
    if (adminsCollection) {
      console.log('\nVerificando colección de admins:');
      const admins = await db.collection('admins').find({}).toArray();
      console.log('Número de administradores:', admins.length);
      
      if (admins.length > 0) {
        console.log('Emails de administradores:');
        admins.forEach(admin => console.log('- ' + admin.email));
      } else {
        console.log('No hay administradores en la colección');
      }
    } else {
      console.log('\nLa colección de admins no existe');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    console.log('Conexión cerrada');
  }
}

run();
