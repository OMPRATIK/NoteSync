import { SearchIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRef, useState } from "react";

import { useSearchParam } from "@/hooks/use-search-params";

export default function SearchInput() {
  const [search, setSearch] = useSearchParam("search");
  const [value, setValue] = useState<string>(search);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleClear() {
    setValue("");
    setSearch("");
    inputRef.current?.blur();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <form className="relative max-w-[720px] w-full" onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          value={value}
          onChange={handleChange}
          placeholder="Search"
          className="md:text-base dark:text-neutral-100 px-10 sm:px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-[#F0F4F8] dark:bg-neutral-800/50 rounded-full h-[40px] focus-visible:ring-0 focus:bg-white"
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
        >
          <SearchIcon />
        </Button>
        {value && (
          <Button
            onClick={handleClear}
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
          >
            <XIcon />
          </Button>
        )}
      </form>
    </div>
  );
}
