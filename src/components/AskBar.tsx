import { useState, type SubmitEvent } from "react";

export function AskBar() {
  const [question, setQuestion] = useState("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!question.trim()) return;

    console.log(question);
  }

  return (
    <section className="ask-section">
      <label htmlFor="question">Ask me anything</label>

      <form className="ask-bar" onSubmit={handleSubmit}>
        <input
          id="question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="What are you working on right now?"
        />

        <button type="submit" aria-label="Ask question">
          →
        </button>
      </form>
    </section>
  );
}
