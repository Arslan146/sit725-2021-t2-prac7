const { client } = require('./databaseService');

const productsCollection = client.db('dogeland').collection('products');

/**
 * Get all products
 */
const getAll = (res) => {
  productsCollection.find().toArray((err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(result);
  });
};

/**
 * Insert product
 */
const insert = (data, res) => {
  productsCollection.insertOne(data, (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({
      _id: data._id,
      message: 'NFT created',
    });
  });
};

/**
 * Delete product
 */
const remove = (id, res) => {
  productsCollection.deleteOne({ _id: id }, (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ message: 'NFT deleted' });
  });
};

module.exports = {
  getAll,
  insert,
  remove,
};
