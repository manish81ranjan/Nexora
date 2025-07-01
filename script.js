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

