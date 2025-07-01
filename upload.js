const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");
const continueBtn = document.getElementById("continueBtn");

imageInput.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview" />`;
      continueBtn.disabled = false;
    };

    reader.readAsDataURL(file);
  } else {
    imagePreview.innerHTML = "<span>No image selected</span>";
    continueBtn.disabled = true;
  }
});

continueBtn.addEventListener("click", () => {
  // Simulate going to AI processing
  alert("Sending image to AI model...");

  // For now, go to recommendation page (fake)
  window.location.href = "recommendation.html"; // Create this page later
});

// 


