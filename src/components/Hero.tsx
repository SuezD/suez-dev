import { useEffect, useState } from "react";

const TITLE = "Hi, I’m Suez.";
const TAGLINE = "Forever learning & building things.";
const ANIMATION_KEY = "hero-animation-played";

export function Hero() {
  const hasAnimated =
    sessionStorage.getItem(ANIMATION_KEY) === "true";

  const [typedTitle, setTypedTitle] = useState(
    hasAnimated ? TITLE : "",
  );

  const [typedTagline, setTypedTagline] = useState(
    hasAnimated ? TAGLINE : "",
  );

  const [stage, setStage] = useState<
    "title" | "tagline" | "done"
  >(hasAnimated ? "done" : "title");

  useEffect(() => {
    if (stage === "done") return;

    const text = stage === "title" ? TITLE : TAGLINE;
    const setText =
      stage === "title"
        ? setTypedTitle
        : setTypedTagline;

    let index = 0;

    const interval = window.setInterval(() => {
      index += 1;
      setText(text.slice(0, index));

      if (index < text.length) return;

      window.clearInterval(interval);

      if (stage === "title") {
        window.setTimeout(() => {
          setStage("tagline");
        }, 250);
      } else {
        setStage("done");
        sessionStorage.setItem(
          ANIMATION_KEY,
          "true",
        );
      }
    }, stage === "title" ? 55 : 40);

    return () => window.clearInterval(interval);
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

      <p>
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
