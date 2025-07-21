import { db } from "@/app/database/drizzle";
import { books } from "@/app/database/schema";
import BookList from "@/components/BookList";
import Filter from "@/components/Filter";
import Search from "@/components/Search";
import { sql } from "drizzle-orm";
import React from "react";
import Image from "next/image";
import { ClearSearchButton } from "@/components/ClearSearch";
import { SearchContextProvider } from "@/components/SearchContextProvider";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) => {
  const searchParameters = await searchParams;
  const query = searchParameters?.query || "";
  //const currentPage = Number(searchParameters?.page) || 1;

  /*Query the database using the search parameters in the link
   to get the books matching the user's search term 

   The searching is done by indexing the database fields that are searchable and using
   a faster data structure called tsvector to search through the database, improving the search response
   and reducing latency
   */

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
  //limit the books returned to 12

  return (
    <SearchContextProvider>
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

        {searchBookResults.length > 0 ? (
          <BookList
            minLength={1}
            isLoanedBook={false}
            books={searchBookResults}
            containerClassName=""
          />
        ) : (
          <div id="not-found">
            <Image
              src={"/images/no-books.png"}
              width={200}
              height={200}
              alt="No books"
            />
            <h4>No Results Found</h4>
            <p>
              We couldn&apos;t find any books matching your search. Try using
              different keywords or check for typos.
            </p>
            <ClearSearchButton />
          </div>
        )}
      </div>
    </SearchContextProvider>
  );
};

export default page;
