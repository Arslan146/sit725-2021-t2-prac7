const cartList = document.querySelector('#cartList');

// When cart has been updated
socket.on('cart:updated', (cart) => {
  if (cart.length > 0) {
    cartList.innerHTML = cart.map((item) => renderCartItem(item)).join('');
  } else {
    cartList.innerHTML = '<h6 class="center-align">Your cart is empty</h6>';
  }
});

// Render cart item on the page
function renderCartItem(item) {
  return `
  <li class="collection-item avatar">
    <img src="${item.image}" alt="" class="circle" />
    <span class="title">${item.name}</span>
    <p>${item.description}</p>
    <button type="button" onclick="cartRemoveItem('${item._id}')" class="secondary-content btn waves-effect waves-light red"><i class="material-icons">close</i></a>  
  </li>
  `;
}
