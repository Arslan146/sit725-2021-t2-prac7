const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  if (err) throw err;
  console.log('Database connected');
});

module.exports = { client };
