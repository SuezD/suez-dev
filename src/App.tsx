import { Route, Routes } from "react-router";

import { HomePage } from "./pages/HomePage";
import { IdeasPage } from "./pages/IdeasPage";
import { PostCollectionPage } from "./pages/PostCollectionPage";
import { PostPage } from "./pages/PostPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/learn"
        element={<PostCollectionPage />}
      />

      <Route
        path="/learn/:slug"
        element={<PostPage />}
      />

      <Route
        path="/projects"
        element={<IdeasPage />}
      />
    </Routes>
  );
}