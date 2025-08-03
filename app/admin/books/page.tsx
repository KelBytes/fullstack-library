import DataTable from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

// This file is part of the admin books page.
// It imports the DataTable component and the Button component from the UI library.
// The Page component renders a section with a title and a button to add a new book.
// The DataTable component is used to display a list of books with specific fields.
const Page = () => {
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/books/new" className="text-white">
            + Add a New Book
          </Link>
        </Button>
      </div>

      <div className="mt-7 overflow-hidden w-full">
        <DataTable
          fields={["Book Title", "Author", "Genre", "Date Created", "Action"]}
        />
      </div>
    </section>
  );
};

export default Page;
