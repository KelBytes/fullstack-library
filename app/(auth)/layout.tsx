import Image from "next/image";
import React, { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const Layout = async ({ children }: { children: ReactNode }) => {
  // This layout component is used for the authentication pages.
  // It checks if the user is authenticated and redirects them to the home page if they are.
  const session = await auth();

  //if user is authenticated, redirect to home page
  //this prevents authenticated users from accessing the auth pages
  //this is useful for preventing authenticated users from accessing the sign-in and sign-up pages
  if (session) redirect("/");

  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row">
            <Image src="/icons/logo.svg" alt="logo" width={37} height={37} />
            <h1 className="text-2xl font-semibold text-white">BookWise</h1>
          </div>

          <div>{children}</div>
        </div>
      </section>

      <section className="auth-illustration">
        <Image
          src="/images/auth-illustration.png"
          alt="illustration"
          width={1000}
          height={1000}
          className="size-full object-cover"
        />
      </section>
    </main>
  );
};

export default Layout;
