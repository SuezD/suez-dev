import { useNavigate } from "react-router";

import { ChatComposer } from "../components/ChatComposer";
import { ChatMessages } from "../components/ChatMessages";

export function ChatPage() {
  const navigate = useNavigate();

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
