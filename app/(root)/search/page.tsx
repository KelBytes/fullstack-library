import { db } from "@/app/database/drizzle";
import { books } from "@/app/database/schema";
import BookList from "@/components/BookList";
import Filter from "@/components/Filter";
import Search from "@/components/Search";
import { sql } from "drizzle-orm";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) => {
  const searchParameters = await searchParams;
  const query = searchParameters?.query || "";
  //const currentPage = Number(searchParameters?.page) || 1;

  const searchBookResults = await db
    .select()
    .from(books)
    .where(
      sql`(
        setweight(to_tsvector('english', ${books.title}), 'A') ||
        setweight(to_tsvector('english', ${books.author}), 'B') ||
        setweight(to_tsvector('english', ${books.genre}), 'C')
        ) @@ websearch_to_tsquery('english', ${query})`
    )
    .limit(12);

  return (
    <>
      <div className="w-full md:min-w-[40rem] lg:min-w-[50rem] xl:min-w-[70rem] 2xl:min-w-[80rem] max-w-[80rem]">
        <div className="library">
          <p className="library-subtitle">DISCOVER YOUR NEXT GREAT READ:</p>
          <h1 className="library-title">
            Explore and Search for{" "}
            <span className="text-[#ffe1bd]">Any Book</span> In Our Library
          </h1>

          <Search />
        </div>

        <div className="flex justify-between items-center mt-10">
          <h2 className="font-ibm-plex-sans font-bold text-light-100 text-2xl py-4">
            Search Results{" "}
            {query && (
              <span className="text-primary">
                <span className="text-light-100">for </span>
                {query}
              </span>
            )}
          </h2>
          <Filter />
        </div>

        <BookList
          minLength={1}
          isLoanedBook={false}
          books={searchBookResults}
          containerClassName=""
        />
      </div>
    </>
  );
};

export default page;
