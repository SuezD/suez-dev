import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router";

import { useChat } from "../chat/ChatContext";
import { ChatComposer } from "./ChatComposer";
import { ChatMessages } from "./ChatMessages";

const CHAT_VIEWPORT_GAP = 24;
const MOBILE_QUERY = "(max-width: 600px)";

export function AskBar() {
  const navigate = useNavigate();

  const { messages } = useChat();

  const askSectionRef =
    useRef<HTMLElement>(null);

  const [chatMaxHeight, setChatMaxHeight] =
    useState<number>();

  const hasStartedChat =
    messages.length > 0;

  useEffect(() => {
    if (
      !hasStartedChat ||
      !askSectionRef.current
    ) {
      return;
    }

    function updateChatHeight() {
      if (!askSectionRef.current) return;

      const top =
        askSectionRef.current
          .getBoundingClientRect()
          .top;

      setChatMaxHeight(
        window.innerHeight -
          top -
          CHAT_VIEWPORT_GAP,
      );
    }

    updateChatHeight();

    window.addEventListener(
      "resize",
      updateChatHeight,
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateChatHeight,
      );
    };
  }, [hasStartedChat]);

  function handleInputFocus() {
    if (
      window.matchMedia(MOBILE_QUERY).matches
    ) {
      navigate("/chat");
    }
  }

  return (
    <section
      ref={askSectionRef}
      className={`ask-section ${
        hasStartedChat ? "chat-open" : ""
      }`}
      style={
        hasStartedChat && chatMaxHeight
          ? {
              maxHeight: `${chatMaxHeight}px`,
            }
          : undefined
      }
    >
      {!hasStartedChat && (
        <label htmlFor="question">
          Ask me anything
        </label>
      )}

      {hasStartedChat && (
        <ChatMessages />
      )}

      <ChatComposer
        onFocus={handleInputFocus}
      />
    </section>
  );
}
