import { AskBar } from "./components/AskBar";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Section } from "./components/Section";
import { creations, rabbitHoles, work } from "./data/home";

function App() {
  return (
    <div className="page">
      <Header />

      <main>
        <section className="hero">
          <h1>Hi, I’m Suez.</h1>
          <p>Forever learning & building things</p>
        </section>

        <AskBar />

        <div className="home-sections">
          <Section title="Recent Rabbit Holes" className="rabbit-holes">
            <div className="rabbit-list">
              {rabbitHoles.map((item) => (
                <a className="rabbit-item" href="#" key={item.title}>
                  <time>{item.date}</time>
                  <span>{item.title}</span>
                </a>
              ))}
            </div>

            <a className="more-link" href="/learn">
              View All Projects and Learnings →
            </a>
          </Section>

          <Section title="Creations & Ideas" className="creations">
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

            <a className="more-link" href="/projects">
              View All Ideas →
            </a>
          </Section>

          <Section title="What I’m Working On" className="work">
            <div className="work-list">
              {work.map((job) => (
                <div className="job" key={`${job.company}-${job.role}`}>
                  <p>
                    {job.company} -<br />
                    {job.role}
                  </p>
                  <time>{job.dates}</time>
                </div>
              ))}
            </div>

            <a className="more-link" href="/cv">
              View CV →
            </a>
          </Section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
