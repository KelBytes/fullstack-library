"use server";

import { db } from "@/app/database/drizzle";
import { books } from "@/app/database/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning(); //Insert the new book into the database

    revalidatePath("/"); //revalidate the home page to not use data from cache
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to create book" };
  }
};

export const deleteBook = async (params: deleteBookParams) => {
  try {
    await db.delete(books).where(eq(books.id, params.bookId));

    revalidatePath("/");

    return {
      success: true,
      message: "Book has been successfully deleted",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured while deleting the book",
    };
  }
};

export const updateBook = async (params: BookParams, id?: string) => {
  try {
    if (!id) {
      throw new Error("Book id is required for update");
    }
    const updatedBook = await db
      .update(books)
      .set({ ...params })
      .where(eq(books.id, id))
      .returning();

    revalidatePath("/");

    return {
      success: true,
      message: "Book has been successfully updated",
      data: JSON.parse(JSON.stringify(updatedBook[0])),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured while updating the book",
    };
  }
};
