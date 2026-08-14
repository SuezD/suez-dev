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
const SAMPLE_QUESTION = "What are you working on right now?";

export function AskBar() {
  const askSectionRef = useRef<HTMLElement>(null);
  const [chatMaxHeight, setChatMaxHeight] = useState<number>();
  const inputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesRef = useRef<HTMLDivElement>(null);

  function handleInputKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Tab" && !question.trim()) {
      event.preventDefault();
      setQuestion(SAMPLE_QUESTION);
    }
  }

  useEffect(() => {
    const container = messagesRef.current;
    if (!container) return;

    container.scrollTop = container.scrollHeight;
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

    setMessages([
      ...nextMessages,
      {
        role: "assistant",
        content: "",
      },
    ]);

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

      if (!response.body) {
        throw new Error("Response body is missing");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, {
          stream: true,
        });

        const events = buffer.split("\n\n");

        // Keep the incomplete final event for the next chunk.
        buffer = events.pop() ?? "";

        for (const event of events) {
          const line = event
            .split("\n")
            .find((line) =>
              line.startsWith("data:"),
            );

          if (!line) continue;

          const data = line
            .slice("data:".length)
            .trim();

          if (data === "[DONE]") {
            continue;
          }

          const parsed = JSON.parse(data) as {
            response?: string;
          };

          if (!parsed.response) {
            continue;
          }

          setMessages((currentMessages) => {
            const updated = [...currentMessages];
            const lastIndex = updated.length - 1;

            const assistantMessage =
              updated[lastIndex];

            if (
              assistantMessage?.role ===
              "assistant"
            ) {
              updated[lastIndex] = {
                ...assistantMessage,
                content:
                  assistantMessage.content +
                  parsed.response,
              };
            }

            return updated;
          });
        }
      }
    } catch (error) {
      console.error(error);

      setError(
        "Something went wrong. Try again.",
      );
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

              <p>
                {message.content ? (
                  message.content
                ) : (
                  isLoading &&
                  index === messages.length - 1 && (
                    <span className="thinking">
                      thinking
                      <span className="thinking-dots" aria-hidden="true">
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                      </span>
                    </span>
                  )
                )}
              </p>
            </div>
          ))}
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
          onKeyDown={handleInputKeyDown}
          placeholder={
            hasStartedChat
              ? "Ask something else..."
              : SAMPLE_QUESTION
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
