document.addEventListener('DOMContentLoaded', () => {
  const cartIcon = document.getElementById('cart-icon');
  const cartSidebar = document.getElementById('cart-sidebar');
  const closeCartBtn = document.getElementById('close-cart');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartCount = document.getElementById('cart-count');

  let cart = JSON.parse(localStorage.getItem('nexoraCart')) || [];

  function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.img}" width="50" />
        <div>
          <p>${item.name}</p>
          <p>₹${item.price}</p>
          <div class="qty-controls">
            <button class="qty-btn" onclick="decreaseQty(${index})">−</button>
            <span class="qty-count">${item.qty}</span>
            <button class="qty-btn" onclick="increaseQty(${index})">+</button>
          </div>
        </div>
        <button onclick="removeFromCart(${index})">❌</button>
      `;
      cartItemsContainer.appendChild(div);
      total += parseFloat(item.price) * item.qty;
    });

    cartSubtotal.innerText = total.toFixed(2);
    cartCount.innerText = cart.reduce((sum, item) => sum + item.qty, 0);
  }

  function addToCart(product) {
    const existingIndex = cart.findIndex(item => item.name === product.name);
    if (existingIndex !== -1) {
      cart[existingIndex].qty += 1;
    } else {
      product.qty = 1;
      cart.push(product);
    }
    localStorage.setItem('nexoraCart', JSON.stringify(cart));
    updateCartUI();
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('nexoraCart', JSON.stringify(cart));
    updateCartUI();
  }

  window.increaseQty = function(index) {
    cart[index].qty += 1;
    localStorage.setItem('nexoraCart', JSON.stringify(cart));
    updateCartUI();
  }

  window.decreaseQty = function(index) {
    if (cart[index].qty > 1) {
      cart[index].qty -= 1;
    } else {
      cart.splice(index, 1);
    }
    localStorage.setItem('nexoraCart', JSON.stringify(cart));
    updateCartUI();
  }

  document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', e => {
      const card = e.target.closest('.product-card');
      const product = {
        name: card.dataset.name,
        price: card.dataset.price,
        img: card.dataset.img
      };
      addToCart(product);
      cartSidebar.classList.add('open');
    });
  });

  cartIcon.addEventListener('click', () => {
    cartSidebar.classList.toggle('open');
  });

  closeCartBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
  });

  updateCartUI();
});

const buyNowBtn = document.getElementById('buy-now-btn');
const checkoutBtn = document.getElementById('checkout-btn');

function closeCartAfterAction() {
  cartSidebar.classList.remove('open');
  alert('Thank you! Proceeding to checkout...');
}

buyNowBtn?.addEventListener('click', closeCartAfterAction);
checkoutBtn?.addEventListener('click', closeCartAfterAction);
