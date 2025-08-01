import BorrowRequests from "@/components/admin/BorrowRequests";
import React from "react";

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
