#!/bin/bash

# Script para actualizar la aplicación en producción
echo "Iniciando actualización del sitio..."

# 1. Ir al directorio del proyecto
cd /opt/donations

# 2. Descargar los últimos cambios de GitHub
echo "Descargando los últimos cambios de GitHub..."
git pull origin main

# 3. Asegurar que el archivo .env.production esté configurado correctamente
echo "Configurando entorno de producción..."
cd door2life-Frontend
echo 'VITE_BACKEND_HOST=' > .env.production

# 4. Instalar dependencias y compilar el frontend
echo "Compilando el frontend..."
npm install
npm run build

# 5. Reiniciar el backend
echo "Reiniciando el backend..."
cd ../door2life-backend
PID=$(lsof -t -i:8000)
if [ ! -z "$PID" ]; then
  kill -9 $PID
  echo "Proceso anterior terminado (PID: $PID)"
fi
node server.js &
echo "Nuevo proceso de backend iniciado"

# 6. Reiniciar Nginx
echo "Reiniciando Nginx..."
systemctl restart nginx

echo "¡Actualización completada!"
