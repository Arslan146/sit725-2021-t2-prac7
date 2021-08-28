const { ObjectId } = require('mongodb');
const { productsService } = require('../services');

/**
 * Get all products
 */
const getAllProducts = (req, res) => {
  productsService.getAll(res);
};

/**
 * Create new product
 */
const createProduct = (req, res) => {
  productsService.insert(req.body, res);
};

/**
 * Delete product
 */
const deleteProduct = (req, res) => {
  const { id } = req.params;
  productsService.remove(ObjectId(id), res);
};

module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
};
