document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("chatbot-btn");
  const bot = document.getElementById("chatbot-container");
  const input = document.getElementById("chat-input");
  const messages = document.getElementById("chat-messages");

  
  // Toggle chat window
  btn.onclick = () => {
    if (bot.style.display === "none" || bot.style.display === "") {
      bot.style.display = "flex";
      input.focus();
    } else {
      bot.style.display = "none";
    }
  };

  function addMessage(sender, text) {
    const msg = document.createElement("div");
    msg.className = "chat-msg";
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  async function callOpenAI(message) {
    addMessage("You", message);
    addMessage("Nexora AI", "Thinking...");

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
          temperature: 0.7
        })
      });

      const data = await response.json();
      const aiReply = data.choices?.[0]?.message?.content || "Hmm, something went wrong!";
      document.querySelector(".chat-msg:last-child").innerHTML = `<strong>Nexora AI:</strong> ${aiReply}`;

      ["Jacket", "Dress", "T-Shirt"].forEach(item => {
        if (aiReply.toLowerCase().includes(item.toLowerCase())) {
          highlightProduct(item);
        }
      });

    } catch (err) {
      document.querySelector(".chat-msg:last-child").innerHTML = `<strong>Nexora AI:</strong> Failed to respond 😢`;
      console.error("OpenAI Error:", err);
    }
  }

  function highlightProduct(productName) {
    const allCards = document.querySelectorAll('.product-card, .outfit-card');
    allCards.forEach(card => {
      const name = card.dataset.name?.toLowerCase();
      if (name && name.includes(productName.toLowerCase())) {
        card.classList.add('highlighted');
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => card.classList.remove('highlighted'), 3000);
      }
    });
  }

  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && input.value.trim()) {
      callOpenAI(input.value.trim());
      input.value = "";
    }
  });

  setTimeout(() => {
    addMessage("Nexora AI", "Hi! 👋 Ask me anything about fashion, seasons, styles, or outfits.");
  }, 1000);
});
body: JSON.stringify({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: "You are Nexora AI, a fashion assistant for an online clothing store. Recommend products like jackets, dresses, t-shirts, based on style, season (summer/winter), gender (men/women), and occasion. Keep responses short and stylish."
    },
    {
      role: "user",
      content: message
    }
  ],
  temperature: 0.7
})
