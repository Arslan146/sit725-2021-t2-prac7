const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');

// Load environment variables
require('dotenv').config();

// Environment variable
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const mongodb = new MongoClient(MONGODB_URI);

// Express middlewares
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB collections
let productCollection;

// Open MongoDB connection
async function dbConnect() {
  try {
    await mongodb.connect();
    productCollection = mongodb.db('dogeland').collection('products');
    console.log('Database connected');
  } catch (ex) {
    throw err;
  }
}

/*
 * Routes
 */

// Get all products
app.get('/api/products', async (req, res) => {
  if (!productCollection) await dbConnect();
  productCollection
    .find()
    .sort({ _id: -1 })
    .toArray((err, result) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.json(result);
      }
    });
});

// Create a product
app.post('/api/products', async (req, res) => {
  if (!productCollection) await dbConnect();
  productCollection.insertOne(req.body, (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.json({ message: 'Your NFT has been added' });
    }
  });
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
  if (!productCollection) await dbConnect();
  productCollection.deleteOne({ _id: ObjectId(req.params.id) }, (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.json({ message: 'Your NFT has been deleted' });
    }
  });
});

/**
 * Socket
 */

// Log when the user connects or disconnect
io.on('connection', (socket) => {
  console.log(socket);
  console.log('User connected');
  io.on('disconnect', (socket) => {
    console.log('User disconnected');
  });
});

// Start the server
server.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

// This is only needed for Cloud foundry
require('cf-deployment-tracker-client').track();
