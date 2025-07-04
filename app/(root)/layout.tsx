import { auth } from "@/auth";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import { after } from "next/server";
import React, { ReactNode } from "react";
import { db } from "@/app/database/drizzle";
import { usersTable } from "@/app/database/schema";
import { eq } from "drizzle-orm";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) redirect("/sign-in");

  //get the user and see if the last activity date is today
  after(async () => {
    if (!session?.user?.id) return;

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, session?.user?.id))
      .limit(1);

    if (!user || user.length === 0 || !user[0]) return;

    if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10))
      return;

    await db
      .update(usersTable)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(usersTable.id, session?.user?.id));
  });

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header />

        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
