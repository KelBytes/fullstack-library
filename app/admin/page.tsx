import Stat from "@/components/admin/Stat";
import React from "react";
import { db } from "../database/drizzle";
import { books, borrowRecords, usersTable } from "../database/schema";
import { count, eq, sum } from "drizzle-orm";

const Page = async () => {
  const [borrowedBooks] = await db
    .select({ count: count() })
    .from(borrowRecords)
    .where(eq(borrowRecords.status, "BORROWED"));

  const [totalUsers] = await db.select({ count: count() }).from(usersTable);

  const [totalBooks] = await db
    .select({ count: sum(books.totalCopies) })
    .from(books);

  return (
    <div>
      <div className="flex gap-3 flex-wrap">
        <Stat title="Borrowed Books" total={borrowedBooks.count} />
        <Stat title="Total users" total={totalUsers.count} />
        <Stat
          title="Total Books"
          total={totalBooks.count ? Number(totalBooks.count) : 0}
        />
      </div>
    </div>
  );
};

export default Page;
