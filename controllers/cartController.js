// Keep track of items in the cart
let cart = [];

module.exports = (io, socket) => {
  // Add item to cart
  const addItem = (item) => {
    cart.push(item);
    // Broadcast that the cart has been updated
    socket.emit('cart:updated', cart);
    socket.broadcast.emit('cart:updated', cart);
  };

  // Remove item from cart
  const removeItem = (itemId) => {
    // Remove item from array
    cart = cart.filter((item) => item._id !== itemId);
    // Broadcast that the cart has been updated
    socket.emit('cart:updated', cart);
    socket.broadcast.emit('cart:updated', cart);
  };

  socket.on('cart:add', addItem);
  socket.on('cart:remove', removeItem);
};
