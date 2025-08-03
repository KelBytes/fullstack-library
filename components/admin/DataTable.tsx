import { db } from "@/app/database/drizzle";
import { books } from "@/app/database/schema";
import Image from "next/image";
import BookCover from "../BookCover";
import { Button } from "../ui/button";
import DeleteBook from "./DeleteBook";
import Link from "next/link";

const DataTable = async ({ fields }: { fields: Array<string> }) => {
  const allBooks = await db.select().from(books); // Fetch all books from the database
  // The books are selected from the 'books' table in the database.
  // The result is an array of book objects, each containing properties like id, title,
  // author, genre, createdAt, coverUrl, and coverColor.

  return (
    <div className="md:h-[60vh] 2xl:h-[80vh] overflow-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-light-300">
            {fields.map((field) => (
              <th key={field}>{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            /*
          The tbody section maps over the allBooks array to create a table row for each book.
          Each row contains the book title, author, genre, date created, and an action column
          with buttons for editing and deleting the book.
          */ allBooks.map(
              ({
                id,
                title,
                author,
                genre,
                createdAt,
                coverUrl,
                coverColor,
              }) => (
                <tr className="" key={id}>
                  <td className="">
                    <Link href={`/admin/books/${id}`}>
                      <div className="flex items-center gap-2">
                        <BookCover
                          coverColor={coverColor}
                          coverImage={coverUrl}
                          variant="extraSmall"
                        />
                        <p className="font-semibold text-base text-dark-400 line-clamp-1">
                          {title}
                        </p>
                      </div>
                    </Link>
                  </td>
                  <td>{author}</td>
                  <td>{genre}</td>
                  <td>{createdAt?.toDateString()}</td>
                  <td>
                    <div className="flex gap-1 items-center">
                      <Link href={`/admin/books/edit/${id}`}>
                        <Button variant={"ghost"}>
                          <Image
                            src={"/icons/admin/edit.svg"}
                            alt="edit"
                            width={20}
                            height={20}
                          />
                          <span>Edit</span>
                        </Button>
                      </Link>

                      <DeleteBook id={id} />
                    </div>
                  </td>
                </tr>
              )
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
