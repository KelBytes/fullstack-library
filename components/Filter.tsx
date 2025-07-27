"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleFilter = (filter: string) => {
    //If filter is not delete search params
    if (filter != "none") {
      params.set("filter", filter);
    } else {
      params.delete("filter");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      onValueChange={(value: string) => {
        handleFilter(value);
      }}
      defaultValue={params.get("filter") || ""}
      value={params.get("filter") || "none"}
    >
      <SelectTrigger className="select-trigger">
        <p className="text-white font-light">Filter by:</p>
        <SelectValue placeholder="None" />
      </SelectTrigger>
      <SelectContent className="select-content">
        <SelectGroup>
          <SelectItem value="none" className="select-item">
            None
          </SelectItem>
          <SelectItem value="title" className="select-item">
            Title
          </SelectItem>
          <SelectItem value="genre" className="select-item">
            Genre
          </SelectItem>
          <SelectItem value="author" className="select-item">
            Author
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Filter;
