import { auth } from "@/auth";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { desc } from "drizzle-orm";
import React from "react";
import { db } from "@/app/database/drizzle";
import { books } from "@/app/database/schema";

const Home = async () => {
  //Get the authentication state of the user
  const session = await auth();

  //Query the database for the first 11 books
  const latestBooks = (await db
    .select()
    .from(books)
    .limit(11)
    .orderBy(desc(books.createdAt))) as Book[];
  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />

      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
        minLength={2}
        isLoanedBook={false}
      />
    </>
  );
};

export default Home;
