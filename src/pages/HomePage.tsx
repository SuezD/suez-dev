import { Link } from "react-router";

import { AskBar } from "../components/AskBar";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { posts } from "../content/posts";
import { Section } from "../components/Section";

import {
  creations,
  work,
} from "../data/home";

const recentRabbitHoles = posts.slice(0, 3);

export function HomePage() {
  return (
    <div className="page home-page">
      <Header />

      <main>
        <Hero />

        <AskBar />

        <div className="home-sections">
          <Section
            title="Recent Rabbit Holes"
            className="rabbit-holes"
          >
            <div className="rabbit-list">
              {recentRabbitHoles.map((post) => (
                <Link
                  className="rabbit-item"
                  to={`/learn/${post.slug}`}
                  key={post.slug}
                >
                  <time>{post.date}</time>
                  <span>{post.title}</span>
                </Link>
              ))}
            </div>

            <Link
              className="more-link"
              to="/learn"
            >
              View All Rabbit Holes →
            </Link>
          </Section>

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

            <a
              className="more-link"
              href={`${import.meta.env.BASE_URL}suez-dirie-cv.pdf`}
              download="Suez-Dirie-CV.pdf"
            >
              Download CV →
            </a>
          </Section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
