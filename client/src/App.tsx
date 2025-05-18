import React, { useState } from "react";
import { useAsk } from "./hooks/useAsk";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const reply = await useAsk(question);
      setResponse(reply);
    } catch (err) {
      setResponse("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">Ask WendyBot</h1>
      <input
        className="border border-gray-300 rounded px-4 py-2 mb-2 w-full max-w-md"
        placeholder="Ask a question about your job hunt"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
        {loading ? "Thinking..." : "Ask"}
      </button>
      {response && (
        <div className="mt-4 bg-white p-4 rounded shadow max-w-md">
          <p className="text-gray-700">{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
