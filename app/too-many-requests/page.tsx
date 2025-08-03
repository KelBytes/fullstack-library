import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

// This file is part of the "Too Many Requests" page.
// It handles the scenario where a user has made too many requests in a short period of time.
// The Page component displays a message indicating the issue and provides a button to go back to the home page or sign-in page based on the user's authentication status.
// It uses the auth function to check if the user is authenticated.
// If the user is authenticated, the button redirects them to the home page;
// otherwise, it redirects them to the sign-in page.
// The page is styled with a main container that centers the content and displays a message and a
const Page = async () => {
  //Get user login status
  const session = await auth();

  return (
    <main className="root-container min-h-screen flex flex-col items-center justify-center relative">
      <h1 className="font-bebas-neue text-light-100 text-5xl font-bold">
        What&apos;s up, Doc?🥕
      </h1>
      <p className="text-light-400 text-xl mt-3 text-center max-w-xl">
        It seems like you&apos;ve made too many requests in a short period of
        time. Please try again later.
      </p>
      {/*if the user is authenticated, the button takes them back to the home page else the sign in page */}
      <Link href={session ? "/" : "/sign-in"} className="mt-5">
        <Button className="font-bold">Go Back</Button>
      </Link>
    </main>
  );
};

export default Page;
