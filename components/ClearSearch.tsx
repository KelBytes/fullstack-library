"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSearchContext } from "./SearchContextProvider";
import { Button } from "./ui/button";

export const ClearSearchButton = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const { setSearchTerm } = useSearchContext();

  const handleSearch = () => {
    setSearchTerm("");
    replace(`${pathname}`);
  }; //Handle clearing search field and search params

  return (
    <Button
      className="not-found-btn"
      onClick={() => {
        handleSearch();
      }}
    >
      clear search
    </Button>
  );
};
