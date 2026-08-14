import { Link } from "react-router";
import { Status } from "./Status";
import { status } from "../data/home";

export function Header() {
  return (
    <header className="header">
      <Link className="logo" to="/">
        suez.dev
      </Link>

      <Status
        state={status.state}
        text={status.text}
      />
    </header>
  );
}
