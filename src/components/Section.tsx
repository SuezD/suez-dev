import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  title,
  children,
  className = "",
}: SectionProps) {
  return (
    <section className={`home-section ${className}`}>
      <h2>{title}</h2>
      <div className="section-rule" />
      {children}
    </section>
  );
}
