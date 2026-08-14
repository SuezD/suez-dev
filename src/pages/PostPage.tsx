import Markdown from "react-markdown";
import { Link, useParams } from "react-router";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { getPost } from "../content/posts";

function headingId(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function getHeadings(content: string) {
  return content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const title = line.replace("## ", "").trim();

      return {
        title,
        id: headingId(title),
      };
    });
}

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

  const headings = getHeadings(post.content);

  return (
    <div className="page post-page">
      <Header />

      <main className="post-main">
        <article className="post">
          <aside className="post-sidebar">
            <div className="post-sidebar-inner">
              <Link to="/" className="post-back">
                ← home
              </Link>
              <header className="post-header">
                <time>{post.date}</time>

                <h1>{post.title}</h1>

                <p>{post.description}</p>
              </header>

              {headings.length > 0 && (
                <nav className="post-toc" aria-label="On this page">
                  {headings.map((heading, index) => (
                    <button
                      key={heading.id}
                      type="button"
                      onClick={() => {
                        document
                          .getElementById(heading.id)
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {heading.title}
                    </button>
                  ))}
                </nav>
              )}
            </div>
          </aside>

          <div className="post-content">
            <Markdown
              components={{
                h2: ({ children }) => {
                  const title = Array.isArray(children)
                    ? children.join("")
                    : String(children);

                  return <h2 id={headingId(title)}>{children}</h2>;
                },
              }}
            >
              {post.content}
            </Markdown>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
