import BorrowRequests from "@/components/admin/BorrowRequests";
import React from "react";

// This file is part of the admin borrow records page.
// It imports the BorrowRequests component to display borrow requests.
// The Page component renders a section with a title and the BorrowRequests component.
const Page = () => {
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Borrow Requests</h2>
      </div>

      <div className="mt-7 overflow-hidden w-full">
        <BorrowRequests
          fields={[
            "Book",
            "User Requested",
            "Status",
            "Borrowed date",
            "Return date",
            "Due Date",
            "Receipt",
          ]}
        />
      </div>
    </section>
  );
};

export default Page;
