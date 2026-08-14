import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router";

import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./styles/archive.css";
import "./styles/globals.css";
import "./styles/home.css";
import "./styles/post.css";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
