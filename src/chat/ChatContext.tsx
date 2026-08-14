import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatContextValue = {
  messages: Message[];
  question: string;
  setQuestion: (question: string) => void;
  isLoading: boolean;
  error: string | null;
  sendMessage: () => Promise<void>;
};

const WORKER_URL =
  "https://suez-dev-llm-chat-app.suez-dirie.workers.dev/api/chat";

const STORAGE_KEY = "suez-ai-messages";

const ChatContext = createContext<ChatContextValue | null>(null);

function loadMessages(): Message[] {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);

    return stored
      ? (JSON.parse(stored) as Message[])
      : [];
  } catch {
    return [];
  }
}

export function ChatProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [messages, setMessages] =
    useState<Message[]>(loadMessages);

  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(messages),
    );
  }, [messages]);

  async function sendMessage() {
    const text = question.trim();

    if (!text || isLoading) return;

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

  return (
    <ChatContext.Provider
      value={{
        messages,
        question,
        setQuestion,
        isLoading,
        error,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error(
      "useChat must be used within ChatProvider",
    );
  }

  return context;
}
