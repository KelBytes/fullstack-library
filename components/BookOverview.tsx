import React from "react";
import Image from "next/image";
import BookCover from "@/components/BookCover";
import BorrowBook from "@/components/BorrowBook";
import { db } from "@/app/database/drizzle";
import { eq } from "drizzle-orm";
import { usersTable } from "@/app/database/schema";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props extends Book {
  userId: string;
  admin?: boolean;
}

const BookOverview = async ({
  title,
  author,
  genre,
  description,
  coverColor,
  coverUrl,
  totalCopies,
  availableCopies,
  rating,
  userId,
  id,
  admin = false,
}: Props) => {
  //get a single user from the database that matches the currently signed in user's id
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);

  //Check if the user is eligible to borrow
  const borrowingEligibility = {
    isEligible: availableCopies > 0 && user?.status === "APPROVED",
    message:
      availableCopies <= 0
        ? "Book is not available"
        : "You are not eligible to borrow this book",
  };

  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1
          className={cn(
            !admin
              ? "text-white text-5xl font-semibold md:text-7xl"
              : "text-black text-5xl font-semibold md:text-7xl"
          )}
        >
          {title}
        </h1>

        <div className={cn("book-info", admin && "text-black")}>
          <p>
            By{" "}
            <span
              className={cn(
                admin ? "text-gray-700" : "text-light-200",
                "font-semibold"
              )}
            >
              {author}
            </span>
          </p>

          <p>
            Category{" "}
            <span
              className={cn(
                admin ? "text-gray-700" : "text-light-200",
                "font-semibold"
              )}
            >
              {genre}
            </span>
          </p>

          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="Star" width={22} height={22} />
            <p>{rating}</p>
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-4 mt-1">
          <p className={cn(admin ? "text-black" : "text-light-100", "text-xl")}>
            Total Books:{" "}
            <span
              className={cn(
                admin ? "text-gray-700" : "text-primary",
                "ml-2 font-semibold"
              )}
            >
              {totalCopies}
            </span>
          </p>
          <p className={cn(admin ? "text-black" : "text-light-100", "text-xl")}>
            Available Books:{" "}
            <span
              className={cn(
                admin ? "text-gray-700" : "text-primary",
                "ml-2 font-semibold"
              )}
            >
              {availableCopies}
            </span>
          </p>
        </div>

        <p className={cn(admin && "text-black", "book-description")}>
          {description}
        </p>

        {/*If the user is not signed do not display the borrow book button */}
        {!admin && (
          <BorrowBook
            bookId={id}
            userId={userId}
            borrowingEligibility={borrowingEligibility}
          />
        )}
      </div>

      <div className="relative flex flex-1 justify-center">
        <Link href={`/books/${id}`}>
          <div className="relative">
            <BookCover
              variant="wide"
              className="z-10"
              coverColor={coverColor}
              coverImage={coverUrl}
            />

            <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
              <BookCover
                variant="wide"
                coverColor={coverColor}
                coverImage={coverUrl}
              />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default BookOverview;
