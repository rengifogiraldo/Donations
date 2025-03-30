const express = require('express');
const app = express();

// Ruta básica de prueba
app.get('/test', (req, res) => res.json({ status: 'ok' }));

// Iniciar servidor
const PORT = 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🟢 Servidor TEST escuchando en http://localhost:${PORT}/test`);
});
