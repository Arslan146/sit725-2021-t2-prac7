// Load environment variables
require('dotenv').config();

const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

async function createServer() {
  const app = express();
  const server = http.createServer(app);
  const io = socketIO(server);

  // Express middlewares
  app.use(express.static(__dirname + '/public'));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Routes
  app.use('/api/products', require('./routes/products'));

  // Log when the user connects or disconnect
  io.on('connection', (socket) => {
    console.log('User connected', socket);
    io.on('disconnect', (socket) => {
      console.log('User disconnected');
    });
  });

  // Start the server
  server.listen(process.env.PORT, () => console.log('Server is running on port', process.env.PORT));
}

createServer();

// This is only needed for Cloud foundry
require('cf-deployment-tracker-client').track();
