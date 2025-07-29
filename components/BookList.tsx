import React from "react";
import BookCard from "@/components/BookCard";
import { cn } from "@/lib/utils";

interface Props {
  title?: string;
  books: Book[];
  containerClassName?: string;
  minLength: number;
  isLoanedBook: boolean;
}

const BookList = ({
  title,
  books,
  containerClassName,
  minLength,
  isLoanedBook,
}: Props) => {
  if (books.length < minLength) return;
  return (
    <section className={containerClassName}>
      {title && (
        <h2 className="font-bebas-neue text-light-100 text-4xl py-4">
          {title}
        </h2>
      )}

      <ul className={cn(isLoanedBook && "borrowed-book_list", "book-list")}>
        {books.map((book) => (
          <BookCard key={book.id} {...book} isLoanedBook={isLoanedBook} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
