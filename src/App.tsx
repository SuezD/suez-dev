import {
  Route,
  Routes,
} from "react-router";

import { ChatPage } from "./pages/ChatPage";
import { HomePage } from "./pages/HomePage";
import { PostPage } from "./pages/PostPage";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/chat"
        element={<ChatPage />}
      />

      <Route
        path="/learn/:slug"
        element={<PostPage />}
      />
    </Routes>
  );
}
