import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

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
        <p>Table</p>
      </div>
    </section>
  );
};

export default Page;
