async function sendMessage(userInput) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userInput }),
  });

  const data = await response.json();
  document.getElementById("chat-output").innerText = data.reply;
}

document.getElementById("send-btn").addEventListener("click", () => {
  const input = document.getElementById("user-input").value;
  sendMessage(input);
});
