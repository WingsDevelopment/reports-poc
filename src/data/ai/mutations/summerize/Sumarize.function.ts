export async function summarizeText(text: string): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that summarizes text concisely.",
        },
        { role: "user", content: text },
      ],
      temperature: 0.5,
    }),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || "Failed to summarize text");
  }
  const data = await response.json();
  return data.choices[0].message.content as string;
}
