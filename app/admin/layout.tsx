import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import "@/styles/admin.css";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { usersTable } from "@/app/database/schema";
import { db } from "@/app/database/drizzle";
import { eq } from "drizzle-orm";

const Layout = async ({ children }: { children: ReactNode }) => {
  //If you are not signed in redirect to sign in page to prevent unauthorised access
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  //check if the currently signed in user has admin priveleges
  const isAdmin = await db
    .select({ isAdmin: usersTable.ROLE })
    .from(usersTable)
    .where(eq(usersTable.id, session.user.id))
    .limit(1)
    .then((res) => res[0]?.isAdmin === "ADMIN");

  //If the currently signed in user does not have admin priveleges redirect to the home page
  if (!isAdmin) redirect("/");

  return (
    <main className="flex min-h-screen w-full flex-row overflow-hidden">
      <Sidebar session={session} />

      <div className="admin-container">
        <Header session={session} />
        {children}
      </div>
    </main>
  );
};

export default Layout;
