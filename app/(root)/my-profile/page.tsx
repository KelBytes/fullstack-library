import { db } from "@/app/database/drizzle";
import { books, borrowRecords } from "@/app/database/schema";
import { auth } from "@/auth";
import BookList from "@/components/BookList";
import ProfileCard from "@/components/ProfileCard";
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
    <div className="flex max-md:flex-col gap-16">
      <ProfileCard session={session} />
      <div className="flex-1 flex">
        {borrowedBooks.length > 0 ? (
          <BookList
            title="BORROWED BOOKS"
            books={borrowedBooks}
            minLength={1}
            isLoanedBook={true}
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
