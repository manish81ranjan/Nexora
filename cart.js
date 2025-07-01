document.addEventListener('DOMContentLoaded', () => {
  const cartIcon = document.getElementById('cart-icon');
  const cartSidebar = document.getElementById('cart-sidebar');
  const closeCartBtn = document.getElementById('close-cart');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartCount = document.getElementById('cart-count');

  let cart = JSON.parse(localStorage.getItem('nexoraCart')) || [];

  function saveCart() {
    localStorage.setItem('nexoraCart', JSON.stringify(cart));
  }

  function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
      const quantity = item.quantity || 1;
      const price = parseFloat(item.price);
      const subtotal = price * quantity;
      total += subtotal;

      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}" />
        <div class="cart-item-details">
          <p>${item.name}</p>
          <p>₹${price}</p>
          <div class="quantity-controls">
            <button class="decrease" data-index="${index}">−</button>
            <span>${quantity}</span>
            <button class="increase" data-index="${index}">+</button>
          </div>
        </div>
        <button class="remove-item" data-index="${index}">❌</button>
      `;
      cartItemsContainer.appendChild(div);
    });

    cartSubtotal.innerText = total.toFixed(2);
    cartCount && (cartCount.innerText = cart.length);

    // Attach event listeners for quantity controls and remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', () => {
        const index = button.dataset.index;
        cart.splice(index, 1);
        saveCart();
        updateCartUI();
      });
    });

    document.querySelectorAll('.increase').forEach(button => {
      button.addEventListener('click', () => {
        const index = button.dataset.index;
        cart[index].quantity = (cart[index].quantity || 1) + 1;
        saveCart();
        updateCartUI();
      });
    });

    document.querySelectorAll('.decrease').forEach(button => {
      button.addEventListener('click', () => {
        const index = button.dataset.index;
        cart[index].quantity = (cart[index].quantity || 1) - 1;
        if (cart[index].quantity <= 0) cart.splice(index, 1);
        saveCart();
        updateCartUI();
      });
    });
  }

  function addToCart(product) {
    const existing = cart.find(item => item.name === product.name);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    saveCart();
    updateCartUI();
    cartSidebar.classList.add('open');
  }

  // Handle Buy Now buttons from both index.html and recommendation.html
  document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', e => {
      const card = e.target.closest('.product-card, .outfit-card');
      if (!card) return;

      const product = {
        name: card.dataset.name,
        price: card.dataset.price,
        img: card.dataset.img,
        quantity: 1
      };
      addToCart(product);
    });
  });

  // Toggle cart sidebar
  cartIcon?.addEventListener('click', () => {
    cartSidebar.classList.toggle('open');
  });

  closeCartBtn?.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
  });

  // Initial load
  updateCartUI();
});
