import { db } from "@/app/database/drizzle";
import { books } from "@/app/database/schema";
import Image from "next/image";
import BookCover from "../BookCover";
import { Button } from "../ui/button";
import DeleteBook from "./DeleteBook";

const DataTable = async () => {
  const allBooks = await db.select().from(books);

  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="bg-light-300 rounded-2xl">
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
                </td>
                <td>{author}</td>
                <td>{genre}</td>
                <td>{createdAt?.toDateString()}</td>
                <td>
                  <div className="flex gap-1 items-center">
                    <Button variant={"ghost"}>
                      <Image
                        src={"/icons/admin/edit.svg"}
                        alt="edit"
                        width={20}
                        height={20}
                      />
                      <span>Edit</span>
                    </Button>

                    <DeleteBook id={id} />
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
};

export default DataTable;
