// Future: Fetch suggestions from AI backend
console.log("AI recommendation page loaded.");

document.addEventListener("DOMContentLoaded", () => {
  // 1. Load uploaded image
  const uploadedImg = localStorage.getItem("nexoraUploadedImage");
  const userImgTag = document.getElementById("user-image");

  if (uploadedImg && userImgTag) {
    userImgTag.src = uploadedImg;
  }

  // 2. AI Outfit Suggestions (static mock data for now)
  const suggestionsContainer = document.querySelector(".suggestions");

  const outfitData = [
    {
      name: "Sleek Black Jacket",
      price: 2499,
      img: "https://via.placeholder.com/200"
    },
    {
      name: "White Cotton Tee",
      price: 799,
      img: "https://via.placeholder.com/200"
    },
    {
      name: "Slim Fit Jeans",
      price: 1899,
      img: "https://via.placeholder.com/200"
    }
  ];

  suggestionsContainer.innerHTML = ""; // Clear existing suggestions

  outfitData.forEach(product => {
    const card = document.createElement("div");
    card.className = "outfit-card";
    card.dataset.name = product.name;
    card.dataset.price = product.price;
    card.dataset.img = product.img;

    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button class="buy-btn">Buy Now</button>
    `;

    suggestionsContainer.appendChild(card);
  });

  // 3. Cart Functionality
  document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', e => {
      const card = e.target.closest('.outfit-card');
      const product = {
        name: card.dataset.name,
        price: card.dataset.price,
        img: card.dataset.img
      };

      const cart = JSON.parse(localStorage.getItem('nexoraCart')) || [];
      cart.push(product);
      localStorage.setItem('nexoraCart', JSON.stringify(cart));
      document.getElementById("cart-count").innerText = cart.length;

      const cartSidebar = document.getElementById("cart-sidebar");
      if (cartSidebar) cartSidebar.classList.add("open");
    });
  });
});

