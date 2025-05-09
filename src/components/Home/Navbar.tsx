import { Link } from "react-router";
import SearchInput from "./SearchInput";
import { UserButton } from "@clerk/clerk-react";
import { ToggleTheme } from "../Themes/ToggleTheme";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between h-full w-full gap-2">
      <div className="flex gap-3 items-center shrink-0">
        <Link to="/">
          <img src="/logo.svg" alt="Logo" width={48} height={48} />
        </Link>
        <h3 className="text-xl sm:block hidden">NoteSync</h3>
      </div>

      <SearchInput />
      <div className="flex items-center gap-3">
        <ToggleTheme />
        <UserButton />
      </div>
    </nav>
  );
}
