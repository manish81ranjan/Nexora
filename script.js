// Toggle navbar on mobile
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');

  // Toggle between ☰ and ✖
  if (hamburger.textContent === '☰' || hamburger.textContent === '≡') {
    hamburger.textContent = '✖'; // close icon
  } else {
    hamburger.textContent = '☰'; // open icon
  }
});

const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;
let slideInterval = setInterval(nextSlide, 2000);

function nextSlide() {
  slides[currentSlide].classList.remove("active");
  dots[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

// Manual Dot Click
dots.forEach(dot => {
  dot.addEventListener("click", () => {
    clearInterval(slideInterval); // stop auto
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");
    currentSlide = parseInt(dot.dataset.index);
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
    slideInterval = setInterval(nextSlide, 2000); // restart auto
  });
});

const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll("#filtered-products .product-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;

    // Toggle active class
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    // Filter cards
    productCards.forEach(card => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

