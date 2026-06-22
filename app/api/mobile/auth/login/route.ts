import { db } from "@/app/database/drizzle";
import { usersTable } from "@/app/database/schema";
import { createAccessToken } from "@/lib/session";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        {
          success: false,
          message: "Email and password are required",
        },
        {
          status: 400,
        },
      );
    }

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);
    if (user.length === 0) {
      return Response.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        {
          status: 401,
        },
      );
    }

    const isPasswordValid = await compare(password, user[0].password); //compare the entered password to the scrambled or encrypted password

    if (!isPasswordValid) {
      return Response.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const sessionPayload = {
      userId: user[0].id.toString(),
      name: user[0].fullName,
      role: user[0].ROLE!,
      email: user[0].email,
      status: user[0].status!,
    };

    const { accessToken, expiresAt } = await createAccessToken(sessionPayload);

    return Response.json(
      {
        success: true,
        message: "Login successful",
        accessToken,
        expiresAt,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error during login:", error);
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
