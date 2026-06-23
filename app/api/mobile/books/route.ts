import { db } from "@/app/database/drizzle";
import { books } from "@/app/database/schema";
import { verifyAccessToken } from "@/lib/session";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split(" ")[1]; // strips "Bearer "

    const { isAuth } = await verifyAccessToken(token ?? "");

    if (!isAuth) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const booksByGenre = await db.select().from(books);

    const grouped = booksByGenre.reduce(
      (acc, book) => {
        if (!acc[book.genre]) acc[book.genre] = [];
        acc[book.genre].push(book);
        return acc;
      },
      {} as Record<string, typeof booksByGenre>,
    );

    const result = Object.entries(grouped).map(([genre, books]) => ({
      genre,
      books,
    }));

    return Response.json(
      { success: true, data: result },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error fetching books:", error);
    return Response.json(
      {
        success: false,
        message: "Internal server error, please try again later",
      },
      {
        status: 500,
      },
    );
  }
}
