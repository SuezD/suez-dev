import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";

import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./styles/globals.css";
import "./styles/home.css";
import "./styles/post.css";
import "./styles/chat.css";

import { ChatProvider } from "./chat/ChatContext";
import App from "./App";

createRoot(
  document.getElementById("root")!,
).render(
  <StrictMode>
    <HashRouter>
      <ChatProvider>
        <App />
      </ChatProvider>
    </HashRouter>
  </StrictMode>,
);
