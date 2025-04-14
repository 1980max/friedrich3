const API_KEY = "sk-xxxx..."; // ← Deinen gültigen API Key hier einfügen (nur lokal zum Testen)

async function fetchAnswer(userInput) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Du bist ein Kunstvermittler in einer Ausstellung über Caspar David Friedrich. Antworte präzise und freundlich auf Fragen.",
          },
          {
            role: "user",
            content: userInput,
          },
        ],
        temperature: 0.7,
      }),
    });

    // 💥 Fehlerbehandlung
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Fehler:", errorText);
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;

  } catch (error) {
    console.error("Fehler bei fetchAnswer:", error);
    return "Ups! Es gab ein Problem mit der Antwort. Bitte versuch es später nochmal.";
  }
}

// 🧠 Input/Output Logik
document.querySelector("#sendButton").addEventListener("click", async () => {
  const userInput = document.querySelector("#userInput").value;
  const responseBox = document.querySelector("#responseBox");

  responseBox.textContent = "Antwort wird geladen...";
  const answer = await fetchAnswer(userInput);
  responseBox.textContent = answer;
});
