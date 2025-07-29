import { db } from "@/app/database/drizzle";
import { books, borrowRecords } from "@/app/database/schema";
import { auth } from "@/auth";
import BookList from "@/components/BookList";
import ProfileCard from "@/components/ProfileCard";
import { cn } from "@/lib/utils";
import { eq } from "drizzle-orm";

import React from "react";

const Page = async () => {
  //Get user authentication state and store it in variable session
  const session = await auth();

  if (!session?.user?.id) {
    // Handle unauthenticated state or throw an error
    return <div>You must be logged in to view your borrowed books.</div>;
  }

  //Query the database table "borrowRecords" whilst comparing the user id to get the user's borrowed books
  const borrowedBooks = (await db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      genre: books.genre,
      rating: books.rating,
      coverUrl: books.coverUrl,
      coverColor: books.coverColor,
      videoUrl: books.videoUrl,
      description: books.description,
      totalCopies: books.totalCopies,
      availableCopies: books.availableCopies,
      summary: books.summary,
      createdAt: books.createdAt,
    })
    .from(borrowRecords)
    .leftJoin(books, eq(books.id, borrowRecords.bookId))
    .where(eq(borrowRecords.userId, session?.user?.id))) as Book[];

  return (
    <div
      className={cn(
        (borrowedBooks.length > 2 || borrowedBooks.length < 1) && "flex-col",
        "flex max-md:flex-col gap-16 md:gap-8"
      )}
    >
      <ProfileCard session={session} />
      <div
        className={cn(
          "flex-1 flex w-full ",
          borrowedBooks.length > 2 &&
            "md:min-w-[40rem] lg:min-w-[50rem] xl:min-w-[70rem] 2xl:min-w-[80rem] max-w-[80rem]"
        )}
      >
        {borrowedBooks.length > 0 ? (
          <BookList
            title="BORROWED BOOKS"
            books={borrowedBooks}
            minLength={1}
            isLoanedBook={true}
            containerClassName="w-full"
          />
        ) : (
          <p className="text-white text-4xl font-bold uppercase">
            BORROWED BOOKS (0)
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
