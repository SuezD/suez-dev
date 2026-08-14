import { useEffect, useRef, useState } from "react";
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

  const headings = post ? getHeadings(post.content) : [];

  const [activeHeading, setActiveHeading] = useState("");
  const [showMobileToc, setShowMobileToc] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  const tocRef = useRef<HTMLElement | null>(null);
  const activeHeadingTitle = headings.find(
    (heading) => heading.id === activeHeading
  )?.title;

  const scrollToHeading = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!headings.length) return;

    const updateActiveHeading = () => {
      const offset = 140;

      let current = headings[0].id;

      for (const heading of headings) {
        const element = document.getElementById(heading.id);

        if (!element) continue;

        if (element.getBoundingClientRect().top <= offset) {
          current = heading.id;
        } else {
          break;
        }
      }

      setActiveHeading(current);
    };

    updateActiveHeading();

    window.addEventListener("scroll", updateActiveHeading, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateActiveHeading);
    };
  }, [post?.content]);

  useEffect(() => {
    const toc = tocRef.current;

    if (!toc) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowMobileToc(
          !entry.isIntersecting && entry.boundingClientRect.top < 0
        );
      },
      {
        threshold: 0,
      }
    );

    observer.observe(toc);

    return () => observer.disconnect();
  }, [post?.content]);

  useEffect(() => {
    if (!showMobileToc) {
      setMobileTocOpen(false);
    }
  }, [showMobileToc]);

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

      {headings.length > 0 && (
        <div
          className={`mobile-post-nav${showMobileToc ? " is-visible" : ""}`}
          aria-hidden={!showMobileToc}
        >
          <div className="mobile-post-nav-inner">
            <button
              type="button"
              className="mobile-post-nav-toggle"
              onClick={() => setMobileTocOpen((open) => !open)}
              aria-controls="mobile-post-toc"
              aria-expanded={mobileTocOpen}
            >
              <span>{activeHeadingTitle ?? "On this page"}</span>

              <span aria-hidden="true">{mobileTocOpen ? "↑" : "↓"}</span>
            </button>

            {mobileTocOpen && (
              <nav
                id="mobile-post-toc"
                className="mobile-post-nav-menu"
                aria-label="On this page"
              >
                {headings.map((heading, index) => (
                  <button
                    key={heading.id}
                    type="button"
                    className={heading.id === activeHeading ? "active" : ""}
                    onClick={() => {
                      scrollToHeading(heading.id);
                      setMobileTocOpen(false);
                    }}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {heading.title}
                  </button>
                ))}
              </nav>
            )}
          </div>
        </div>
      )}

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
                <nav ref={tocRef} className="post-toc" aria-label="On this page">
                  {headings.map((heading, index) => (
                    <button
                      key={heading.id}
                      type="button"
                      onClick={() => {
                        scrollToHeading(heading.id);
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
