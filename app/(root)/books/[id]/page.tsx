import { db } from "@/app/database/drizzle";
import { books } from "@/app/database/schema";
import { auth } from "@/auth";
import BookOverview from "@/components/BookOverview";
//import BookVideo from "@/components/BookVideo";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  //Get the unique id of the book from the page link
  const { id } = await params;
  //Get user authentication state
  const session = await auth();

  //Query the database for the book details and store it in an object with key value pairs
  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);

  //If the database is queried and there are no books with the unique id, redirect to a not-found page
  if (!bookDetails) redirect("/404");
  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user?.id as string} />

      <div className="book-details">
        <div className="flex-[1.5">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>

            {/* <BookVideo videoUrl={bookDetails.videoUrl} /> */}
          </section>

          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>

            <div className="space-y-5 text-xl text-light-100">
              {/*Arrange the summary of the book into multiple lines */}
              {bookDetails.summary.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        </div>

        {/* {similar books} */}
      </div>
    </>
  );
};

export default Page;
