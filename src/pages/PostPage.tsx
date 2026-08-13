import Markdown from "react-markdown";
import { Link, useParams } from "react-router";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { getPost } from "../content/posts";

export function PostPage() {
  const { slug } = useParams();

  const post = slug ? getPost(slug) : undefined;

  if (!post) {
    return (
      <div className="page post-page">
        <Header />

        <main className="post-main">
          <Link to="/" className="post-back">
            ← home
          </Link>

          <h1>Couldn't find that post.</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="page post-page">
      <Header />

      <main className="post-main">
        <Link to="/" className="post-back">
          ← home
        </Link>

        <article className="post">
          <header className="post-header">
            <time>{post.date}</time>

            <h1>{post.title}</h1>

            <p>{post.description}</p>

            <div className="post-tags">
              {post.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </header>

          <div className="post-content">
            <Markdown>{post.content}</Markdown>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
