import React from "react";
import BookCard from "@/components/BookCard";

interface Props {
  title: string;
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
      <h2 className="font-bebas-neue text-light-100 text-4xl">{title}</h2>

      <ul className="book-list">
        {books.map((book) => (
          <BookCard key={book.title} {...book} isLoanedBook={isLoanedBook} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
