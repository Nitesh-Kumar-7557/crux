import config from "../config/index.js";

type messagesType = [
  { role: "system"; content: string },
  { role: "user";   content: string }
]

export async function chat(model: string, messages: messagesType) {
  const response = await fetch(`${config.ollama_base_url}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: model,
      messages: messages,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json() as {message: {content: string}};
  return data.message.content;
}