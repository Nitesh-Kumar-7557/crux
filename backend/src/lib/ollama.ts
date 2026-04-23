import config from "../config/index.js";

type messagesType = [
  { role: "system"; content: string },
  { role: "user";   content: string }
]

export async function chat(messages: messagesType) {
  console.log(`[Ollama] calling deepseek`);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120000);

  try {
    const response = await fetch(`${config.ollama_base_url}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: 'deepseek',
        messages,
        stream: false,
        options: {
          temperature: 0.7,
        },
      }),
      signal: controller.signal,
    });
    
    if (!response.ok) {
      throw new Error(`Ollama error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json() as {message: {content: string}};
    console.log("OLLAMA RAW DATA:", JSON.stringify(data, null, 2));
    return data.message.content;
  } catch(err: any){
    if (err.name === "AbortError") {
      throw new Error("Ollama request timed out after 2 minutes");
    }
    throw err;
  }
  finally {
    clearTimeout(timeout)
  }


}