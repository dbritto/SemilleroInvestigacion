const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Manejo de conexión
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Recibir datos del ESP32
  socket.on('sensorData', (data) => {
    console.log('Datos recibidos:', data);

    // Reenviar datos a los clientes
    io.emit('updateData', data);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const PORT = 80;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});








