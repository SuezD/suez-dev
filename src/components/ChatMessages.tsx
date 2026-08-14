import {
  useEffect,
  useRef,
} from "react";

import { useChat } from "../chat/ChatContext";

type ChatMessagesProps = {
  className?: string;
};

export function ChatMessages({
  className = "",
}: ChatMessagesProps) {
  const {
    messages,
    isLoading,
    error,
  } = useChat();

  const messagesRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messagesRef.current;

    if (!container) return;

    requestAnimationFrame(() => {
      container.scrollTop =
        container.scrollHeight;
    });
  }, [messages, isLoading]);

  return (
    <div
      ref={messagesRef}
      className={`chat-messages ${className}`}
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
        <p className="chat-error">
          {error}
        </p>
      )}
    </div>
  );
}
