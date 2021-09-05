const io = require('socket.io-client');
const chai = require('chai');

describe('Socket: Cart', () => {
  let socket;

  beforeEach((done) => {
    socket = io('http://localhost:8080');
    done();
  });

  afterEach((done) => {
    socket.disconnect();
    done();
  });

  it('should add item to cart', (done) => {
    socket.emit('cart:add', {
      _id: 1,
      name: 'Dogecoin',
    });
    socket.on('cart:updated', (cart) => {
      chai.expect(cart.length).to.equal(1);
      done();
    });
  });

  it('should remove item from cart', (done) => {
    socket.emit('cart:remove', 1);
    socket.on('cart:updated', (cart) => {
      chai.expect(cart.length).to.equal(0);
      done();
    });
  });
});
