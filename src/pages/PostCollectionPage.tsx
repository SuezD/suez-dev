import { Link } from "react-router";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { posts } from "../content/posts";

export function PostCollectionPage() {
  return (
    <div className="page archive-page">
      <Header />

      <main className="archive-main">
        <header className="archive-header">
          <h1>Rabbit Holes</h1>

          <p>
            Things I’m learning that might turn into full builds.
          </p>
        </header>

        <div className="archive-list">
          {posts.map((post) => (
            <Link
              key={post.slug}
              className="archive-item"
              to={`/learn/${post.slug}`}
            >
              <time>{post.date}</time>

              <div className="archive-item-content">
                <h2>{post.title}</h2>

                {post.description && (
                  <p>{post.description}</p>
                )}
              </div>

              <span
                className="archive-arrow"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}