const formAddProduct = document.querySelector('#formAddProduct');
const productList = document.querySelector('#productList');

// Event listeners
formAddProduct.addEventListener('submit', handleAddProduct);
productList.addEventListener('click', handleDeleteProduct);

// Get all the products
function getProducts() {
  NProgress.start();
  fetch('/api/products')
    .then((res) => res.json())
    .then((items) => {
      if (items.length > 0) {
        productList.innerHTML = items.map((item) => renderProduct(item)).join('');
      } else {
        productList.innerHTML = '<h6 class="center-align">No NFTs available</h6>';
      }
    })
    .catch((ex) => {
      M.toast({ html: `Error: ${ex.message}` });
    })
    .finally(() => {
      NProgress.done();
    });
}
getProducts();

// Render products on the page
function renderProduct(item) {
  return `
  <div class="col s12 m4">
    <div class="card">
      <div class="card-image">
        <div class="card-image__wrapper">
          <img src="${item.image || 'https://dummyimage.com/300x300'}" />
        </div>
        <button data-id="${
          item._id
        }" class="btnDeleteProduct btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">delete</i></button>
      </div>
      <div class="card-content">
        <span class="card-title">${item.name || ''}</span>
        <p class="green-text card-price"><i class="material-icons">attach_money</i> ${item.price || 0} DOGE</p>
        <p class="grey-text">${item.description || ''}</p>
      </div>
    </div>
  </div>
  `;
}

// Handler to add a product
function handleAddProduct(event) {
  // Prevent reloading the page
  event.preventDefault();

  // Elements
  const productName = document.querySelector('#productName');
  const productPrice = document.querySelector('#productPrice');
  const productImage = document.querySelector('#productImage');
  const productDesc = document.querySelector('#productDesc');
  const modal = M.Modal.getInstance(document.querySelector('#modalAddProduct'));

  NProgress.start();

  // Send a request to the server
  fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: productName.value,
      price: productPrice.value,
      image: productImage.value,
      description: productDesc.value,
      createdAt: new Date().toGMTString(),
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      getProducts();
      setTimeout(() => {
        M.toast({ html: data.message });
      }, 1000);
    })
    .catch((ex) => {
      M.toast({ html: `Error: ${ex.message}` });
    })
    .finally(() => {
      NProgress.done();
      // Reset the form inputs
      productName.value = '';
      productPrice.value = '';
      productImage.value = '';
      productDesc.value = '';
      // Close the modal
      modal.close();
    });
}

function handleDeleteProduct(event) {
  if (event.target.parentNode.classList.contains('btnDeleteProduct')) {
    const dataset = event.target.parentNode.dataset;
    const id = dataset.id;
    const confirmed = window.confirm('Do you really want to delete this NFT?');
    if (confirmed) {
      NProgress.start();
      fetch(`/api/products/${id}`, { method: 'DELETE' })
        .then((res) => res.json())
        .then((data) => {
          M.toast({ html: data.message });
          getProducts();
        })
        .catch((ex) => {
          M.toast({ html: `Error: ${ex.message}` });
        })
        .finally(() => {
          NProgress.done();
        });
    }
  }
}
