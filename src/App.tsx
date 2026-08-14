import { Route, Routes } from "react-router";

import { HomePage } from "./pages/HomePage";
import { PostPage } from "./pages/PostPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/learn/:slug" element={<PostPage />} />
    </Routes>
  );
}
