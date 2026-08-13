export function Header() {
  return (
    <header className="header">
      <a className="logo" href="/">
        suez.dev
      </a>

      <nav className="nav" aria-label="Main navigation">
        <a href="/work">work</a>
        <a href="/learn">learn</a>
        <a href="/notes">notes</a>
      </nav>
    </header>
  );
}
