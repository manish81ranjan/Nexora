document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const imagePreview = document.getElementById("imagePreview");
  const continueBtn = document.getElementById("continueBtn");

  imageInput.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const imageData = e.target.result;
        localStorage.setItem("nexoraUploadedImage", imageData); // Save image to localStorage

        imagePreview.innerHTML = `<img src="${imageData}" alt="Preview" />`;
        continueBtn.disabled = false;
      };

      reader.readAsDataURL(file);
    } else {
      imagePreview.innerHTML = "<span>No image selected</span>";
      continueBtn.disabled = true;
    }
  });

  continueBtn.addEventListener("click", () => {
  const imgSrc = document.querySelector("#imagePreview img")?.src;
  if (imgSrc) {
    localStorage.setItem("nexoraUploadedImage", imgSrc);
  }

  window.location.href = "processing.html";
});
});

if (file && file.type.startsWith("image/")) {
  const reader = new FileReader();
  reader.onload = function (e) {
    imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview" />`;
    continueBtn.disabled = false;
    localStorage.setItem("nexoraUploadedImage", e.target.result); // Important for recommendation page
  };
  reader.readAsDataURL(file);
} else {
  alert("Please upload a valid image file.");
  imagePreview.innerHTML = "<span>No image selected</span>";
  continueBtn.disabled = true;
}

// In upload.js after user selects photo
localStorage.setItem("nexoraUserBodyType", "slim"); // Just an example
