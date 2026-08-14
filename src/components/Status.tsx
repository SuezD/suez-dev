type StatusProps = {
  state: "building" | "learning" | "writing" | "idle";
  text: string;
};

export function Status({ state, text }: StatusProps) {
  return (
    <div className="status">
      <span
        className={`status-dot status-dot-${state}`}
        aria-hidden="true"
      />

      <span className="status-text">
        {state}: {text}
      </span>
    </div>
  );
}
