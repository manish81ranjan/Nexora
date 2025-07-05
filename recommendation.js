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

const bodyType = localStorage.getItem("nexoraUserBodyType");

let outfits = [];

if (bodyType === "slim") {
  outfits = [
    { name: "Slim Fit Jeans", price: 1899, img: "..." },
    { name: "Layered Hoodie", price: 1799, img: "..." }
  ];
} else if (bodyType === "plus") {
  outfits = [
    { name: "Relaxed Fit Shirt", price: 1399, img: "..." },
    { name: "Straight Cut Jeans", price: 1699, img: "..." }
  ];
}

document.addEventListener("DOMContentLoaded", () => {
  const uploadedImg = localStorage.getItem("nexoraUploadedImage");
  const userImgTag = document.getElementById("user-image");

  if (uploadedImg && userImgTag) {
    userImgTag.src = uploadedImg;
  }

  // Step 1: Simulate AI-based body type detection (mocked)
  const mockFeatures = {
    bodyType: "broad", // e.g., broad, slim, average
    skinTone: "medium", // optional future use
    season: "summer"
  };

  // Step 2: Outfit data (in future, fetch from backend)
  const outfits = [
    {
      name: "Slim Fit Jeans",
      price: 1899,
      img: "images/jeans.jpg",
      tag: "Best Fit",
      score: 92
    },
    {
      name: "White Cotton Tee",
      price: 799,
      img: "images/tshirt.jpg",
      tag: "Popular Pick",
      score: 88
    },
    {
    name: "Slim Fit Jeans",
    price: 1899,
    img: "images/jeans.jpg",
    tag: "Best Fit",
    score: 92
  },
  {
    name: "White Cotton Tee",
    price: 799,
    img: "images/tshirt.jpg",
    tag: "Popular Pick",
    score: 88
  }
  ];

  // Step 3: Filter logic
  const matchedOutfits = outfits.filter(outfit =>
    outfit.tags.includes(mockFeatures.bodyType) || outfit.tags.includes(mockFeatures.season)
  );

  // Step 4: Render suggestions
  const suggestionsContainer = document.querySelector(".suggestions");
  suggestionsContainer.innerHTML = ""; // clear default cards

  matchedOutfits.forEach(outfit => {
    const div = document.createElement("div");
    div.className = "outfit-card";
    div.setAttribute("data-name", outfit.name);
    div.setAttribute("data-price", outfit.price);
    div.setAttribute("data-img", outfit.img);
    div.innerHTML = `
      <img src="${outfit.img}" alt="${outfit.name}" />
      <h3>${outfit.name}</h3>
      <p>₹${outfit.price}</p>
      <button class="buy-btn">Buy Now</button>
    `;
    suggestionsContainer.appendChild(div);
  });

  // Re-attach buy button listeners (reuse from cart.js logic)
  document.querySelectorAll(".buy-btn").forEach(button => {
    button.addEventListener("click", e => {
      const card = e.target.closest(".outfit-card");
      const product = {
        name: card.dataset.name,
        price: parseFloat(card.dataset.price),
        img: card.dataset.img,
        quantity: 1
      };
      let cart = JSON.parse(localStorage.getItem("nexoraCart")) || [];
      cart.push(product);
      localStorage.setItem("nexoraCart", JSON.stringify(cart));
      location.reload(); // simple fix for now to refresh cart
    });
  });
});

const tagHTML = result.tag ? `<p class="tag">${result.tag}</p>` : '';
const scoreHTML = result.score ? `<p class="score">AI Score: ${result.score}%</p>` : '';

card.innerHTML = `
  <img src="${result.img}" alt="${result.name}" />
  <h3>${result.name}</h3>
  <p>₹${result.price}</p>
  ${tagHTML}
  ${scoreHTML}
  <button class="buy-btn">Buy Now</button>
`;

function renderSuggestions(data, filter = 'all') {
  const container = document.querySelector('.suggestions');
  container.innerHTML = '';

  const filtered = filter === 'all'
    ? data
    : data.filter(outfit => outfit.tags.includes(filter));

  filtered.forEach(outfit => {
    const card = document.createElement('div');
    card.className = 'outfit-card';
    card.dataset.name = outfit.name;
    card.dataset.price = outfit.price;
    card.dataset.img = outfit.img;

    card.innerHTML = `
      <img src="${outfit.img}" alt="${outfit.name}" />
      <h3>${outfit.name}</h3>
      <p>₹${outfit.price}</p>
      ${outfit.tag ? `<p class="tag">${outfit.tag}</p>` : ''}
      ${outfit.score ? `<p class="score">AI Score: ${outfit.score}%</p>` : ''}
      <button class="buy-btn">Buy Now</button>
    `;

    container.appendChild(card);
  });

  attachBuyListeners(); // reuse existing function to rebind buy buttons
}

document.getElementById("styleFilter").addEventListener("change", e => {
  renderSuggestions(mockResults, e.target.value);
});
function renderSuggestions(data, filter = 'all', sort = 'default') {
  let filtered = filter === 'all' ? data : data.filter(outfit => outfit.tags.includes(filter));

  if (sort === 'priceLow') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'priceHigh') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === 'scoreHigh') {
    filtered.sort((a, b) => (b.score || 0) - (a.score || 0));
  }

  const container = document.querySelector('.suggestions');
  container.innerHTML = '';

  filtered.forEach(outfit => {
    const card = document.createElement('div');
    card.className = 'outfit-card';
    card.dataset.name = outfit.name;
    card.dataset.price = outfit.price;
    card.dataset.img = outfit.img;

    card.innerHTML = `
      <img src="${outfit.img}" alt="${outfit.name}" />
      <h3>${outfit.name}</h3>
      <p>₹${outfit.price}</p>
      ${outfit.tag ? `<p class="tag">${outfit.tag}</p>` : ''}
      ${outfit.score ? `<p class="score">AI Score: ${outfit.score}%</p>` : ''}
      <button class="buy-btn">Buy Now</button>
    `;

    container.appendChild(card);
  });

  attachBuyListeners();
}
const recData = [
  { name: "Slim Fit Blazer", price: 2399, img: "img1.jpg", bodyType: "slim" },
  { name: "Relaxed Fit Hoodie", price: 1899, img: "img2.jpg", bodyType: "bulky" },
  { name: "Summer Shirt", price: 999, img: "img3.jpg", season: "summer" },
  { name: "Winter Jacket", price: 2599, img: "img4.jpg", season: "winter" }
];

const container = document.getElementById("recommendations");

if (!localStorage.getItem("userUploaded")) {
  container.innerHTML = "<p>Please upload a photo first to get suggestions.</p>";
} else {
  const recommended = recData.filter(
    (item) => item.season === "summer" || item.bodyType === "slim"
  );

  recommended.forEach((item) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>₹${item.price}</p>
      <button>Add to Cart</button>
    `;
    container.appendChild(div);
  });
}
const userTags = ['summer', 'women', 'slim']; // mock from uploaded image

const matches = recData.filter(product =>
  userTags.every(tag => product.tags.includes(tag))
);
document.querySelectorAll(".buy-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    const name = card.dataset.name;
    const price = card.dataset.price;
    const img = card.dataset.img;

    addToCart({ name, price, img }); // use your existing function
  });
});
