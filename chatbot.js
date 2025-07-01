document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("chatbot-btn");
  const bot = document.getElementById("chatbot-container");
  const close = document.getElementById("chat-close");
  const input = document.getElementById("chat-input");
  const messages = document.getElementById("chat-messages");

  const OPENAI_API_KEY = "sk-REPLACE_WITH_YOUR_KEY"; // 🔒 REPLACE this with your actual OpenAI API key

  btn.onclick = () => {
    bot.classList.toggle("chat-hidden");
    input.focus();
  };

  close.onclick = () => {
    bot.classList.add("chat-hidden");
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
          Authorization: `Bearer ${OPENAI_API_KEY}`
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
    } catch (err) {
      document.querySelector(".chat-msg:last-child").innerHTML = `<strong>Nexora AI:</strong> Failed to respond 😢`;
      console.error("OpenAI Error:", err);
    }
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
function highlightProduct(productName) {
  const allCards = document.querySelectorAll('.product-card, .outfit-card');

  allCards.forEach(card => {
    const name = card.dataset.name?.toLowerCase();
    if (name && name.includes(productName.toLowerCase())) {
      card.classList.add('highlighted');

      // Scroll to it
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Remove highlight after 3 sec
      setTimeout(() => card.classList.remove('highlighted'), 3000);
    }
  });
}
const aiReply = data.choices?.[0]?.message?.content || "Hmm, something went wrong!";
document.querySelector(".chat-msg:last-child").innerHTML = `<strong>Nexora AI:</strong> ${aiReply}`;

// NEW — detect and highlight product if it's mentioned
["Jacket", "Dress", "T-Shirt"].forEach(item => {
  if (aiReply.toLowerCase().includes(item.toLowerCase())) {
    highlightProduct(item);
  }
});
