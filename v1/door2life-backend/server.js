require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// 1. Capturador de errores globales (añade esto SIEMPRE al inicio)
process.on('uncaughtException', (err) => {
  console.error('⚠️ Error no capturado:', err);
});

// 2. Conexión mejorada a MongoDB (reemplaza tu conexión actual)
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');
    return true;
  } catch (err) {
    console.error('❌ Error MongoDB:', err.message);
    throw err;
  }
};

// 3. Middlewares básicos (deja estos tal cual)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Ruta de prueba (opcional, para verificar)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// 5. Inicio del servidor CON MANEJO DE ERRORES (copia desde aquí hasta el final)
connectDb().then(() => {
  const PORT = process.env.PORT || 8000;
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🟢 Servidor ACTIVO en http://localhost:${PORT}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Error: El puerto ${PORT} está en uso`);
    } else {
      console.error('❌ Error del servidor:', err.code);
    }
    process.exit(1);
  });
}).catch(err => {
  console.error('❌ No se pudo iniciar la aplicación:', err.message);
  process.exit(1);
});