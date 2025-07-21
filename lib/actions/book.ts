"use server";

import { db } from "@/app/database/drizzle";
import { books, borrowRecords } from "@/app/database/schema";
import { eq, and } from "drizzle-orm";
import dayjs from "dayjs";

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    const book = await db
      .select({ availableCopies: books.availableCopies, id: books.id })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    const isBorrowed = await db
      .select()
      .from(borrowRecords)
      .where(
        and(eq(borrowRecords.userId, userId), eq(borrowRecords.bookId, bookId))
      );

    if (isBorrowed.length > 0) {
      return {
        success: false,
        error: "You have already borrowed this book.",
      };
    }

    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        error: "Failed to borrow book(Out of Stock)",
      };
    } //check if there are available copies

    const dueDate = dayjs().add(7, "day").toDate().toDateString();

    await db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: "BORROWED",
    }); //Insert the borrowed book with the user that borrowed it into the borrowRecords table

    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId)); //update the number of available books

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occured while borrowing the book, try again later.",
    };
  }
};
