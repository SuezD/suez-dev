import { useEffect, useState } from "react";

const title = "Hi, I’m Suez.";
const tagline = "Forever learning & building things.";

export function Hero() {
  const [typedTitle, setTypedTitle] = useState("");
  const [typedTagline, setTypedTagline] = useState("");
  const [stage, setStage] = useState<"title" | "tagline" | "done">("title");

  useEffect(() => {
    if (stage === "title") {
      let index = 0;

      const interval = window.setInterval(() => {
        index += 1;
        setTypedTitle(title.slice(0, index));

        if (index >= title.length) {
          window.clearInterval(interval);

          window.setTimeout(() => {
            setStage("tagline");
          }, 250);
        }
      }, 80);

      return () => window.clearInterval(interval);
    }

    if (stage === "tagline") {
      let index = 0;

      const interval = window.setInterval(() => {
        index += 1;
        setTypedTagline(tagline.slice(0, index));

        if (index >= tagline.length) {
          window.clearInterval(interval);
          setStage("done");
        }
      }, 60);

      return () => window.clearInterval(interval);
    }
  }, [stage]);

  return (
    <section className="hero">
      <h1>
        {typedTitle}
        {stage === "title" && (
          <span className="cursor" aria-hidden="true">
            ▌
          </span>
        )}
      </h1>

      <p className="hero-tagline">
        {typedTagline}
        {stage !== "title" && (
          <span className="cursor" aria-hidden="true">
            ▌
          </span>
        )}
      </p>
    </section>
  );
}
