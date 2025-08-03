import { db } from "@/app/database/drizzle";
import { books, borrowRecords, usersTable } from "@/app/database/schema";
import BookCover from "../BookCover";
import { Button } from "../ui/button";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getInitials } from "@/lib/utils";

// This component displays borrow requests in a table format.
// It fetches borrow requests from the database, including book details and user information.
// Each row includes a link to the book details, user information, borrow status, dates,
// and a button to generate a report or perform an action related to the borrow request.
// The component is designed to be used in the admin section of the application.
// It accepts an array of fields to display in the table header.
// The borrow requests are displayed in a scrollable table with appropriate styling.
// The component uses the Avatar component to display user initials and the BookCover component for book covers
// The table includes columns for book title, user information, borrow status, dates, and actions

// This component fetches borrow requests from the database and displays them in a table format.
// It uses the `db` instance to query the database and retrieve borrow records along with associated
// book and user details. The results are then rendered in a table with appropriate styling.
// The component is designed to be used in the admin section of the application, specifically for managing
// borrow requests. It accepts a `fields` prop to define the table headers dynamically.
const BorrowRequests = async ({ fields }: { fields: Array<string> }) => {
  const borrowRequests = await db
    .select({
      id: borrowRecords.id,
      book: books.title,
      userRequestedName: usersTable.fullName,
      userRequestedEmail: usersTable.email,
      status: borrowRecords.status,
      borrowedDate: borrowRecords.borrowDate,
      returnDate: borrowRecords.returnDate,
      dueDate: borrowRecords.dueDate,
      coverColor: books.coverColor,
      coverUrl: books.coverUrl,
    })
    .from(borrowRecords)
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .innerJoin(usersTable, eq(borrowRecords.userId, usersTable.id));

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
          {borrowRequests.map(
            ({
              id,
              book,
              coverColor,
              coverUrl,
              userRequestedName,
              userRequestedEmail,
              status,
              borrowedDate,
              returnDate,
              dueDate,
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
                        {book}
                      </p>
                    </div>
                  </Link>
                </td>
                <td>
                  <div className="user-table">
                    <div>
                      <Avatar>
                        <AvatarFallback className="bg-amber-100">
                          {
                            getInitials(
                              userRequestedName || "IN"
                            ).toUpperCase() /* Get initials from user name*/
                          }
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="flex flex-col">
                      <p className="font-semibold font-ibm-plex-sans">
                        {userRequestedName}
                      </p>
                      <p className="font-light text-sm text-light-500">
                        {userRequestedEmail}
                      </p>
                    </div>
                  </div>
                </td>

                <td>{status}</td>
                <td>{borrowedDate.toDateString()}</td>
                <td>{returnDate}</td>
                <td>{dueDate}</td>
                <td>
                  <div>
                    <Button>Generate</Button>
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

export default BorrowRequests;
