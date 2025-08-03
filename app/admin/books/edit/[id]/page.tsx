import { db } from "@/app/database/drizzle";
import { books } from "@/app/database/schema";
import BookForm from "@/components/admin/forms/BookForm";
import { Button } from "@/components/ui/button";
import { eq } from "drizzle-orm";
import Link from "next/link";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const bookId = (await params).id; // Get the unique id of the book from the page link
  // Query the database for the book details using the unique id
  const [book] = await db
    .select()
    .from(books)
    .where(eq(books.id, bookId))
    .limit(1); // Type assertion to Book[]
  return (
    <>
      <Button asChild className="back-btn">
        <Link href={`/admin/books`} className="text-primary-admin">
          Go Back
        </Link>
      </Button>

      <section className="w-full max-w-2xl">
        <BookForm
          type="update"
          title={book.title}
          id={book.id}
          description={book.description}
          summary={book.summary}
          totalCopies={book.totalCopies}
          availableCopies={book.availableCopies}
          rating={book.rating}
          coverColor={book.coverColor}
          coverUrl={book.coverUrl}
          videoUrl={book.videoUrl}
          author={book.author}
          genre={book.genre}
        />
      </section>
    </>
  );
};

export default Page;
