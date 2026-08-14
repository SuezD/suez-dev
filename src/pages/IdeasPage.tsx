import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { creations } from "../data/home";

export function IdeasPage() {
  return (
    <div className="page archive-page">
      <Header />

      <main className="archive-main">
        <header className="archive-header">
          <h1>Creations & Ideas</h1>

          <p>
            Things I’ve made, experiments I’ve tried, and ideas
            I’m playing with.
          </p>
        </header>

        <div className="archive-list">
          {creations.map((creation) => (
            <a
              key={creation.title}
              className="archive-item idea-item"
              href={creation.href}
            >
              <div className="archive-item-content">
                <h2>{creation.title}</h2>
                <p>{creation.description}</p>
              </div>

              <span
                className="archive-arrow"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
