import { Link } from "react-router";
import SearchInput from "./SearchInput";
import { UserButton } from "@clerk/clerk-react";
import { ToggleTheme } from "../Themes/ToggleTheme";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between h-full w-full">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link to="/">
          <img src="/logo.svg" alt="Logo" width={48} height={48} />
        </Link>
        <h3 className="text-xl">NoteSync</h3>
      </div>

      <SearchInput />
      <div className="flex items-center gap-3">
        <ToggleTheme />
        <UserButton />
      </div>
    </nav>
  );
}
