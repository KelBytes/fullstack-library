import { db } from "@/app/database/drizzle";
import { books } from "@/app/database/schema";
import Image from "next/image";
import BookCover from "../BookCover";
import { Button } from "../ui/button";
import DeleteBook from "./DeleteBook";
import Link from "next/link";

const DataTable = async () => {
  const allBooks = await db.select().from(books);

  return (
    <div className="md:h-[60vh] 2xl:h-[80vh] overflow-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-light-300">
            <th className="">Book Title</th>
            <th className="">Author</th>
            <th className="">Genre</th>
            <th className="">Date Created</th>
            <th className="">Action</th>
          </tr>
        </thead>
        <tbody>
          {allBooks.map(
            ({ id, title, author, genre, createdAt, coverUrl, coverColor }) => (
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
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
