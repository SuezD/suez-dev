import {
  useRef,
  type KeyboardEvent,
  type SubmitEvent,
} from "react";

import { useChat } from "../chat/ChatContext";

const SAMPLE_QUESTION =
  "What are you working on right now?";

type ChatComposerProps = {
  onFocus?: () => void;
  autoFocus?: boolean;
  className?: string;
};

export function ChatComposer({
  onFocus,
  autoFocus = false,
  className = "",
}: ChatComposerProps) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const {
    messages,
    question,
    setQuestion,
    isLoading,
    sendMessage,
  } = useChat();

  const hasStartedChat =
    messages.length > 0;

  function handleKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (
      event.key === "Tab" &&
      !question.trim()
    ) {
      event.preventDefault();
      setQuestion(SAMPLE_QUESTION);
    }
  }

  function handleSubmit(
    event: SubmitEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!question.trim() || isLoading) {
      return;
    }

    void sendMessage();

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }

  return (
    <form
      className={`ask-bar ${className}`}
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        id="question"
        value={question}
        onChange={(event) =>
          setQuestion(event.target.value)
        }
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        placeholder={
          hasStartedChat
            ? "Ask something else..."
            : SAMPLE_QUESTION
        }
        autoFocus={autoFocus}
      />

      <button
        type="submit"
        aria-label="Ask question"
        disabled={isLoading}
      >
        →
      </button>
    </form>
  );
}
