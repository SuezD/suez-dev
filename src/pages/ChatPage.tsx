import { useEffect } from "react";
import { useNavigate } from "react-router";

import { ChatComposer } from "../components/ChatComposer";
import { ChatMessages } from "../components/ChatMessages";

export function ChatPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const viewport = window.visualViewport;

    if (!viewport) return;

    function updateHeight() {
      document.documentElement.style.setProperty(
        "--chat-height",
        `${viewport!.height}px`,
      );
    }

    updateHeight();

    viewport.addEventListener("resize", updateHeight);

    return () => {
      viewport.removeEventListener("resize", updateHeight);

      document.documentElement.style.removeProperty(
        "--chat-height",
      );
    };
  }, []);

  return (
    <main className="chat-page">
      <header className="chat-page-header">
        <button
          type="button"
          onClick={() => navigate("/")}
          aria-label="Back to homepage"
        >
          ←
        </button>

        <span>Suez AI</span>
      </header>

      <ChatMessages className="chat-page-messages" />

      <ChatComposer
        className="chat-page-composer"
        autoFocus
      />
    </main>
  );
}
