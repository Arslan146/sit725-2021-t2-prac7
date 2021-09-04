document.addEventListener('DOMContentLoaded', function () {
  // Initialize sidenav
  const sidenav = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenav, {});

  // Initialize modals
  var modal = document.querySelectorAll('.modal');
  M.Modal.init(modal, {});
});

// Open WebSocket connection
const socket = io('ws://localhost:8080');

// When cart has been updated
socket.on('cart:updated', (cart) => {
  // Update the cart item count
  document.getElementById('cartItemCount').textContent = cart.length;
});

// Add item to cart
function cartAddItem(data) {
  const item = JSON.parse(decodeURIComponent(data));
  socket.emit('cart:add', item);
}

// Remove item from cart
function cartRemoveItem(itemId) {
  socket.emit('cart:remove', itemId);
}
