const axios = require('axios');
const chai = require('chai');

describe('Products', () => {
  const URL = 'http://localhost:8080/api/products';
  let productId;

  describe('GET /api/products', () => {
    it('should return array of products', (done) => {
      axios
        .get(URL)
        .then((response) => {
          chai.expect(response.status).to.equal(200);
          chai.expect(response.data).to.be.an('array');
        })
        .then(done, done);
    });
  });

  describe('POST /api/products', () => {
    it('should create product', (done) => {
      axios
        .post(URL, {
          name: 'Test Product',
          price: 100,
          image: 'http://test.com/image.jpg',
          description: 'Test Description',
        })
        .then((response) => {
          productId = response.data._id;
          chai.expect(response.status).to.equal(200);
          chai.expect(response.data).to.be.an('object');
          chai.expect(response.data).to.have.property('message').to.equal('NFT created');
        })
        .then(done, done);
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('should delete product', (done) => {
      axios
        .delete(URL + '/' + productId)
        .then((response) => {
          chai.expect(response.status).to.equal(200);
          chai.expect(response.data).to.be.an('object');
          chai.expect(response.data).to.have.property('message').to.equal('NFT deleted');
        })
        .then(done, done);
    });
  });
});
