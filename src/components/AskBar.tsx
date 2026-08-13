import {
  useEffect,
  useRef,
  useState,
  type SubmitEvent,
} from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const WORKER_URL = "https://suez-dev-llm-chat-app.suez-dirie.workers.dev/api/chat";

export function AskBar() {
  const askSectionRef = useRef<HTMLElement>(null);
  const [chatMaxHeight, setChatMaxHeight] = useState<number>();
  const inputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messagesRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  async function handleSubmit(
    event: SubmitEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const text = question.trim();

    if (!text || isLoading) {
      return;
    }

    const nextMessages: Message[] = [
      ...messages,
      {
        role: "user",
        content: text,
      },
    ];

    setMessages(nextMessages);
    setQuestion("");
    setError(null);
    setIsLoading(true);

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    try {
      const response = await fetch(WORKER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Request failed with status ${response.status}`,
        );
      }

      const data: { answer: string } =
        await response.json();

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: data.answer,
        },
      ]);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const hasStartedChat = messages.length > 0;

  useEffect(() => {
    if (!hasStartedChat || !askSectionRef.current) return;

    const updateChatHeight = () => {
      if (!askSectionRef.current) return;

      const top =
        askSectionRef.current.getBoundingClientRect().top;

      const viewportGap = 24;

      setChatMaxHeight(
        window.innerHeight - top - viewportGap
      );
    };

    updateChatHeight();

    window.addEventListener("resize", updateChatHeight);

    return () => {
      window.removeEventListener("resize", updateChatHeight);
    };
  }, [hasStartedChat]);

  return (
    <section
      ref={askSectionRef}
      className={`ask-section ${
        hasStartedChat ? "chat-open" : ""
      }`}
      style={
        hasStartedChat && chatMaxHeight
          ? { maxHeight: `${chatMaxHeight}px` }
          : undefined
      }
    >
      {!hasStartedChat && (
        <label htmlFor="question">
          Ask me anything
        </label>
      )}

      {hasStartedChat && (
        <div
          ref={messagesRef}
          className="chat-messages"
          aria-live="polite"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${message.role}`}
            >
              <span className="chat-message-author">
                {message.role === "user"
                  ? "You"
                  : "Suez AI"}
              </span>

              <p>{message.content}</p>
            </div>
          ))}

          {isLoading && (
            <div className="chat-message assistant">
              <span className="chat-message-author">
                Suez AI
              </span>

              <p>typing...</p>
            </div>
          )}

          {error && (
            <p className="chat-error">{error}</p>
          )}
        </div>
      )}

      <form
        className="ask-bar"
        onSubmit={handleSubmit}
      >
        <input
          ref={inputRef}
          id="question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder={
            hasStartedChat
              ? "Ask something else..."
              : "What are you working on right now?"
          }
        />

        <button
          type="submit"
          aria-label="Ask question"
          disabled={isLoading}
        >
          →
        </button>
      </form>
    </section>
  );
}
