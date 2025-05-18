export async function useAsk(question: string) {
  const response = await fetch("http://localhost:8000/api/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error("Failed to get response from WendyBot");
  }

  const data = await response.json();
  return data.reply;
}
