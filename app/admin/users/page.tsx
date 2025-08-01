import UserTable from "@/components/admin/UserTable";
import React from "react";

const page = () => {
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Users</h2>
      </div>

      <div className="mt-7 overflow-hidden w-full">
        <UserTable
          fields={[
            "Name",
            "Date Joined",
            "Role",
            "Books Borrowed",
            "University ID No",
            "University ID Card",
            "Action",
          ]}
        />
      </div>
    </section>
  );
};

export default page;
