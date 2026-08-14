import { Link } from "react-router";

import { AskBar } from "../components/AskBar";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Section } from "../components/Section";

import {
  creations,
  rabbitHoles,
  work,
} from "../data/home";

export function HomePage() {
  return (
    <div className="page home-page">
      <Header />

      <main>
        <section className="hero">
          <h1>Hi, I’m Suez.</h1>
          <p>Forever Learning & building things</p>
        </section>

        <AskBar />

        <div className="home-sections">
          {/* Recent Rabbit Holes */}
          <Section
            title="Recent Rabbit Holes"
            className="rabbit-holes"
          >
            <div className="rabbit-list">
              {rabbitHoles.map((item) => (
                <Link
                  className="rabbit-item"
                  to={`/learn/${item.slug}`}
                  key={item.slug}
                >
                  <time>{item.date}</time>
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>

            <Link
              className="more-link"
              to="/learn"
            >
              View All Projects and Learnings →
            </Link>
          </Section>

          {/* Creations */}
          <Section
            title="Creations & Ideas"
            className="creations"
          >
            <div className="creation-list">
              {creations.map((creation) => (
                <a
                  className="creation"
                  href={creation.href}
                  key={creation.title}
                >
                  <div>
                    <h3>{creation.title}</h3>
                    <p>{creation.description}</p>
                  </div>

                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>

            <Link
              className="more-link"
              to="/projects"
            >
              View All Ideas →
            </Link>
          </Section>

          {/* Work */}
          <Section
            title="What I’m Working On"
            className="work"
          >
            <div className="work-list">
              {work.map((job) => (
                <div
                  className="job"
                  key={`${job.company}-${job.role}`}
                >
                  <p>
                    {job.company} -
                    <br />
                    {job.role}
                  </p>

                  <time>{job.dates}</time>
                </div>
              ))}
            </div>

            <Link
              className="more-link"
              to="/work"
            >
              View CV →
            </Link>
          </Section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
