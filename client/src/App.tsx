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
      <h1 className="text-2xl font-bold mb-6">Ask Wendy</h1>

      <div className="flex flex-col items-center w-[85%] gap-4">
        <input
          className="border border-gray-300 rounded w-[85%] h-[45px] text-[18px]"
          placeholder="Ask a question about your job hunt"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 h-[45px] w-[85px]">
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>

      {response && (
        <div className="bg-white p-4 rounded shadow w-[85%] text-center text-[18px]">
          <p className="text-gray-700">{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
