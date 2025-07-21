"use client";

import Image from "next/image";
import { Input } from "./ui/input";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSearchContext } from "./SearchContextProvider";
import { useEffect } from "react";

const Search = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { searchTerm, setSearchTerm } = useSearchContext();
  const params = new URLSearchParams(searchParams);

  const handleSearch = useDebouncedCallback((term: string) => {
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`); //Set the link query parameter to the user's search term in the input field
  }, 300);

  /*
  1. Only run when the page first loads.
  2. If the page address contains a search query in its link update the input field with that query
  */
  useEffect(() => {
    setSearchTerm(searchParams.get("query")?.toString() ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="search">
      <Image
        src={"/icons/search-fill.svg"}
        width={28}
        height={28}
        alt="search"
      />
      <Input
        type="text"
        className="search-input"
        placeholder="Search for a book"
        onChange={(e) => {
          handleSearch(e.target.value);
          setSearchTerm(e.target.value);
        }}
        value={searchTerm}
      />

      <button
        onClick={() => {
          setSearchTerm("");
          params.delete("query");
          replace(`${pathname}?${params.toString()}`);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default Search;
