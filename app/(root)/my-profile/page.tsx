import { db } from "@/app/database/drizzle";
import { books, borrowRecords } from "@/app/database/schema";
import { auth } from "@/auth";
import BookList from "@/components/BookList";
import { eq } from "drizzle-orm";
import React from "react";

const Page = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    // Handle unauthenticated state or throw an error
    return <div>You must be logged in to view your borrowed books.</div>;
  }

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
    <>
      <BookList title="BORROWED BOOKS" books={borrowedBooks} minLength={1} />
    </>
  );
};

export default Page;
