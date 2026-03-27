import { useState, useEffect } from "react";
import { generateOpenAiResponse } from "../../api/openAI_response.api.js";

function faq() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (question === "") {
      return;
    }
    console.log("test");
    const getAiResponse = async () => {
      const data = await generateOpenAiResponse(question);
      setResponse(data);
    };
    getAiResponse();
  }, [question]);

  function handleUserPrompt(event) {
    event.preventDefault();
    const userInput = event.target.question.value;
    console.log(userInput);
    setQuestion(userInput);
  }

  return (
    <div className="main-content pt-10 pb-10">
      <div className="text-center my-10">
        <form onSubmit={handleUserPrompt} className="space-y-4">
          <input
            type="text"
            id="question"
            name="question"
            placeholder="Stelle eine Frage"
            className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
          />
          <button>Enter</button>
        </form>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default faq;
